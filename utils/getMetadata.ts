import JSZip from "jszip";
import { DOMParser } from "@xmldom/xmldom";
import * as FileSystem from "expo-file-system";

const zipObj = new JSZip();

async function getContainerXml(folderUri: string) {
  const containerXml = await FileSystem.readAsStringAsync(folderUri + "/META-INF/container.xml");
  
  if (!containerXml) {
    throw new Error("Could not find container.xml at getContainerXml.");
  }

  const doc = new DOMParser().parseFromString(containerXml);
  return doc;
}

function getOpfPath(doc: Document) {
  const opfPath = doc.getElementsByTagName("rootfile")[0].getAttribute("full-path");

  if (!opfPath) {
    throw new Error("Could not find opfPath at getOpfPath.");
  }

  return opfPath;
}

async function getOpfFile(folderUri: string, opfPath: string) {
  const opfFile = await FileSystem.readAsStringAsync(folderUri + `/${opfPath}`);

  if (!opfFile) {
    throw new Error("Could not find opfFile at getOpfFile.");
  }

  return opfFile;
}

function getTextContentByTagName(doc: Document, tagName: string) {
  const element = doc.getElementsByTagName(tagName)[0];
  return element ? element.textContent : undefined;
}

function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T>): T[] {
  return Array.prototype.slice.call(nodeList);
}

function getCoverImagePath(doc: Document) {
  let coverImagePath: string | null = null;

  const metaCover = nodeListToArray(doc.getElementsByTagName("meta"))
    .find(element => element.getAttribute("name") === "cover");

  if (metaCover) {
    const coverImageId = metaCover.getAttribute("content");
    const item = nodeListToArray(doc.getElementsByTagName("item"))
      .find(element => element.getAttribute("id") === coverImageId);

    if (item) {
      coverImagePath = item.getAttribute("href");
    }
  }

  if (!coverImagePath) {
    const imageItem = nodeListToArray(doc.getElementsByTagName("item"))
      .find(
        element =>
          element.getAttribute("href")?.toLowerCase().includes("cover") ||
          element.getAttribute("media-type")?.startsWith("image/")
      );

    if (imageItem) {
      coverImagePath = imageItem.getAttribute("href");
    }
  }

  if (!coverImagePath) {
    throw new Error ("Cover image could not be found in the OPF file.");
  }

  return coverImagePath;
}

async function getMetadataFromOpf(opfFile: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(opfFile, "application/xml");

  const metadata = {
    title: getTextContentByTagName(doc, "dc:title"),
    author: getTextContentByTagName(doc, "dc:creator"),
    language: getTextContentByTagName(doc, "dc:language"),
  };

  const coverImagePath = getCoverImagePath(doc);

  return { metadata, coverImagePath };
}

async function getCoverImageData(folderUri: string, coverImagePath: string, opfPath: string) {
  const directoryPath = opfPath.substring(0, opfPath.lastIndexOf("/") + 1);
  const relativeCoverImagePath = coverImagePath.startsWith("/") ? coverImagePath.substring(1) : coverImagePath;
  const adjustedCoverImagePath = directoryPath + relativeCoverImagePath;

  let coverImageFile: string | null = null;

  // tries to first find the cover image relative to the opf file (more likely)
  coverImageFile = await FileSystem.readAsStringAsync(folderUri + `/${adjustedCoverImagePath}`, { encoding: FileSystem.EncodingType.Base64 });

  if (!coverImageFile) {
    // tries to find the cover image in the same directory as the opf file (less likely)
    coverImageFile = await FileSystem.readAsStringAsync(folderUri + `/${coverImagePath}`, { encoding: FileSystem.EncodingType.Base64 });
  }

  if (!coverImageFile) {
    throw new Error("Cover image file could not be found.");
  }

  return { coverImageDataBase64: coverImageFile };
}

async function saveImageLocally(coverData: string, name: string) {
  await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "covers", { intermediates: true });

  const coverPath = `${FileSystem.documentDirectory}covers/${name}-cover.png`;

  await FileSystem.writeAsStringAsync(coverPath, coverData, { encoding: FileSystem.EncodingType.Base64 });

  return coverPath;
}

async function saveContentLocally(zip: JSZip, fileName: string) {
  const folderUri = FileSystem.documentDirectory + "books/" + fileName;
  await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });

  try {
    await Promise.all(
      Object.keys(zip.files).map(async (filename) => {
        if (zip.files[filename].dir) {
          const newDir = folderUri + "/" + filename;
          await FileSystem.makeDirectoryAsync(newDir, { intermediates: true });
        }

        if (!zip.files[filename].dir) {
          const fileContent = await zip.file(filename)?.async("base64");
  
          if (fileContent) {
            const filePath = folderUri + "/" + filename;
            await FileSystem.writeAsStringAsync(
              filePath,
              fileContent,
              { encoding: FileSystem.EncodingType.Base64 }
            );
          }
        }
      })
    );
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Error creating folders and files locally");
  }

  return folderUri;
}

function formatFileName(fileName: string) {
  let formattedString = fileName.replace(/ /g, "_");

  formattedString = formattedString.toLowerCase();
  formattedString = formattedString.replace(/\.epub$/, "");

  const randomValue = Math.random().toString(16).slice(2, 10);
  formattedString = `${formattedString}_${randomValue}`;

  return formattedString;
}

export default async function getMetadata(fileData: string, fileName: string) {
  try {
    const zip = await zipObj.loadAsync(fileData, { base64: true });
    const folderUri = await saveContentLocally(zip, formatFileName(fileName));

    const containerXml = await getContainerXml(folderUri);

    const opfPath = getOpfPath(containerXml);
    const opfFile = await getOpfFile(folderUri, opfPath);

    const { metadata, coverImagePath } = await getMetadataFromOpf(opfFile);

    const { coverImageDataBase64 } = await getCoverImageData(folderUri, coverImagePath, opfPath);

    const coverLocalPath = await saveImageLocally(coverImageDataBase64, metadata.title!);

    return {
      metadata,
      coverImagePath,
      coverLocalPath,
      folderUri,
      opfUri: folderUri + `/${opfPath}`,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
