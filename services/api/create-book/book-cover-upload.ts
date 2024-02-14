const uploadBookCover = async (destinationUrl: string, blob: Blob, name: string) => {
  const file = new File([blob], `${name}-cover.png`, { type: "image/png" });
  const formData = new FormData();
  formData.append("file", file);

  const uploadCoverImageResponse = await fetch(destinationUrl, {
    method: "PUT",
    body: formData,
  });

  if (!uploadCoverImageResponse.ok) {
    throw new Error(`Failed to upload book cover ${uploadCoverImageResponse.status.toString()}`);
  }
};

export default uploadBookCover;
