import axios from "axios";

export const adminSignUp = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/admins/signup",
      {
        fullName,
        email,
        password,
      }
    );
    return response.data; // Return the response from the API
  } catch (error) {
    throw error; // Propagate any errors from the API
  }
};

export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/admins/login",
      { email, password }
    );
    return response.data; // Assuming backend sends data with success and message
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const studentSignUp = async (
  fullName: string,
  matricNo: string,
  password: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/student/signup",
      {
        fullName,
        matricNo,
        password,
      }
    );

    return response.data; // Successful response
  } catch (error: any) {
    throw error; // Error handling
  }
};

export const studentLogin = async (matricNo: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/student/login",
      {
        matricNo,
        password,
      }
    );

    return response.data; // Successful response (store token and other data if needed)
  } catch (error: any) {
    throw error; // Error handling
  }
};
