import JSZip from "jszip";
import { DOMParser } from "@xmldom/xmldom";

const zipObj = new JSZip();

async function getContainerXml(zipFile: JSZip) {
  const containerXml = await zipFile.file("META-INF/container.xml")?.async("string");
  
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

async function getOpfFile(zip: JSZip, opfPath: string) {
  const opfFile = await zip.file(opfPath)?.async("string");

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

async function getCoverImageData(coverImagePath: string, opfPath: string, zip: JSZip) {
  const directoryPath = opfPath.substring(0, opfPath.lastIndexOf("/") + 1);
  const relativeCoverImagePath = coverImagePath.startsWith("/") ? coverImagePath.substring(1) : coverImagePath;
  const adjustedCoverImagePath = directoryPath + relativeCoverImagePath;

  let coverImageFile: JSZip.JSZipObject | null = null;
  
  // tries to first find the cover image relative to the opf file (more likely)
  coverImageFile = zip.file(adjustedCoverImagePath);

  if (!coverImageFile) {
    // tries to find the cover image in the same directory as the opf file (less likely)
    coverImageFile = zip.file(coverImagePath);
  }

  if (!coverImageFile) {
    throw new Error("Cover image file could not be found.");
  }

  const coverImageData = await coverImageFile.async("base64");
  return coverImageData;
}

export default async function getMetadata(fileData: string) {
  const zip = await zipObj.loadAsync(fileData, { base64: true });

  const containerXml = await getContainerXml(zip);

  const opfPath = getOpfPath(containerXml);
  const opfFile = await getOpfFile(zip, opfPath);

  const { metadata, coverImagePath } = await getMetadataFromOpf(opfFile);

  const coverImageData = await getCoverImageData(coverImagePath, opfPath, zip);

  return {
    metadata,
    coverImagePath,
    coverImageData,
  };
}
