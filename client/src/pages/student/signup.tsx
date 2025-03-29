import { useState } from "react";
import Image from "next/image";
import AuthBg from "../../assets/authimg.png";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studentSignUp } from "@/utils/authUtils";

// Yup Validation Schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  matricNo: Yup.string().required("Matric No is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const StudentSignUp: React.FC = () => {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      // Call API here with student sign up API
      const result = await studentSignUp(
        values.fullName,
        values.matricNo,
        values.password
      );

      if (result) {
        toast.success("Sign Up Successful! Redirecting to login...");
        router.push("/student/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full sm:w-1/2 flex justify-center items-center">
        <Image
          objectFit="center"
          src={AuthBg}
          alt="Auth Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full sm:w-1/2 bg-white p-8 mt-8">
        <h2 className="text-2xl pb-4 font-semibold text-gray-700">
          Welcome to Voters!
        </h2>

        <Formik
          initialValues={{
            fullName: "",
            matricNo: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your fullName"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="matricNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Matric No (Student ID)
                </label>
                <Field
                  type="text"
                  id="matricNo"
                  name="matricNo"
                  placeholder="Enter your matric number"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="matricNo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="pt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/student/login")}
          >
            Login
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default StudentSignUp;
