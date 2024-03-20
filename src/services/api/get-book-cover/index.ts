import axios from "axios";

const API_URL = "http://192.168.1.206:3333";

async function getBookCover(key: string): Promise<string> {
  const response = await axios.get(`${API_URL}/books/covers/${key}`);

  if (response.status !== 200) {
    throw new Error(`API request failed: ${response.statusText || "Unknown error"}`);
  }

  try {
    const signedUrlResponse = await fetch(response.data.coverSignedUrl);
    const result = await signedUrlResponse.json();
    console.log(result);
  } catch (e) {
    console.error("Error fetching signed URL");
  }
  // console.log(signedUrlResponse.data);

  return response.data.coverSignedUrl;
}

export default getBookCover;
