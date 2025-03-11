import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Make sure this matches your backend

// Admin Sign Up
export const adminSignUp = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/admins/register`, {
      fullName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Admin Login
export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Student Sign Up
export const studentSignUp = async (
  fullName: string,
  matricNo: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/student/signup`, {
      fullName,
      matricNo,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Student Login
export const studentLogin = async (matricNo: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/student/login`, {
      matricNo,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
