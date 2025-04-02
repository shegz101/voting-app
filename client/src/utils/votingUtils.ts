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

export const addCandidates = async (
  name: string,
  manifesto: string,
  profilePic: string,
  votingEventId: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/admins/voting-events/${votingEventId}/candidates`,
      {
        name,
        manifesto,
        profilePic,
      }
    );
    return response.data; // Return the response from the API
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Handle the error
    }
  }
};

// Get all voting events in admin side
export const getVotingEvents = async () => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    // Make the GET request with the Bearer token
    const response = await axios.get(
      "http://localhost:5000/api/admins/voting-events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching voting events:", error);
    throw error; // Propagate the error for further handling
  }
};

// Get all voting events in admin side
export const getStudentVotingEvents = async () => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("studentToken");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    // Make the GET request with the Bearer token
    const response = await axios.get(
      "http://localhost:5000/api/students/voting-events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching voting events:", error);
    throw error; // Propagate the error for further handling
  }
};

// vote for a candidate by id
export const voteForCandidate = async (
  candidateId: string,
  voterId: string
): Promise<any> => {
  try {
    const apiUrl = `http://localhost:5000/api/votes/${candidateId}`;

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
    };

    // Make the POST request with headers
    const response = await axios.post(
      apiUrl,
      { voterId },
      { headers } // Pass headers here
    );

    // Return the response data (e.g., success message)
    return response.data;
  } catch (error: any) {
    // Handle errors (e.g., network issues, API errors)
    console.error("Error voting for the candidate:", error);
    throw error;
  }
};

// export const voteForCandidate = async (
//   candidateId: string,
//   voterId: string
// ): Promise<any> => {
//   try {
//     const apiUrl = `http://localhost:5000/api/votes/${candidateId}`;

//     const response = await axios.post(apiUrl, {
//       voterId,
//     });

//     // Return the response data (e.g., success message)
//     return response.data;
//   } catch (error: any) {
//     // Handle errors (e.g., network issues, API errors)
//     console.error("Error voting for the candidate:", error);
//     throw error;
//   }
// };

// get votung event by id
export const getAllVotingEvents = async (): Promise<any> => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    // API URL with dynamic eventId
    const apiUrl = `http://localhost:5000/api/admins/voting-events`;

    // Make the GET request with the Bearer token
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the response data (e.g., voting event details)
    return response.data;
  } catch (error: any) {
    // Handle errors (e.g., network issues, API errors)
    console.error("Error fetching the voting event:", error);
    throw error;
  }
};

// get votung event by id
export const getVotingEventById = async (eventId: string): Promise<any> => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("studentToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    // API URL with dynamic eventId
    const apiUrl = `http://localhost:5000/api/admins/voting-events/${eventId}`;

    // Make the GET request with the Bearer token
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the response data (e.g., voting event details)
    return response.data;
  } catch (error: any) {
    // Handle errors (e.g., network issues, API errors)
    console.error("Error fetching the voting event:", error);
    throw error;
  }
};

// deletig voting event
export const deleteEvent = async (eventId: string): Promise<any> => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    // API URL with dynamic eventId
    const apiUrl = `http://localhost:5000/api/admins/voting-events/${eventId}`;

    // Make the DELETE request with the Bearer token
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the response data (e.g., success message)
    return response.data;
  } catch (error: any) {
    // Handle errors (e.g., network issues, API errors)
    console.error("Error deleting the event:", error);
    throw error;
  }
};
