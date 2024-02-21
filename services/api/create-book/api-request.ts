import axios from "axios";
import type { CreateBookAPIRequestInput, CreateBookAPIResponse } from "./types";

const API_URL = "http://192.168.1.206:3333";

// Book Upload Step 1: Send book data to server
// Returns the data stored in the database
export const createBookAPIRequest = async (data: CreateBookAPIRequestInput): Promise<CreateBookAPIResponse> => {
  const response = await axios.post<CreateBookAPIResponse>(`${API_URL}/books/upload`, data);

  if (response.status !== 201) {
    throw new Error(`API request failed: ${response.statusText || "Unknown error"}`);
  }

  return response.data;
};
