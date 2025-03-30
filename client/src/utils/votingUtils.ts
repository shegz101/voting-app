import axios from "axios";

export const createEvent = async (
  eventName: string,
  endTime: string,
  status: string,
  location: string,
  candidates: any[]
) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/admins/voting-events",
      {
        eventName,
        endTime,
        status,
        location,
        candidates,
      }
    );
    return response.data; // Return the response from the API
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Handle the error
    }
  }
};
