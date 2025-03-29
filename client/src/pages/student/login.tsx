/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import AuthBg from "../../assets/authimg.png";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { studentLogin } from "@/utils/authUtils"; // Import the login API call

// Yup Validation Schema
const validationSchema = Yup.object({
  matricNo: Yup.string().required("Matric No (Student ID) is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const StudentLogin: React.FC = () => {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      // Call API here with student login function
      const result = await studentLogin(values.matricNo, values.password);

      if (result) {
        // If login is successful, store the role in localStorage
        localStorage.setItem("votingRole", "student");
        localStorage.setItem("matricNumber", values.matricNo);
        toast.success("Login Successful! Redirecting to voting events...");
        router.push("/voting/votingEvents"); // Redirect to voting events page
      } else {
        toast.error(
          result.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error logging in");
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
        <h2 className="text-2xl font-semibold text-gray-700 pb-4">
          Welcome Back
        </h2>

        <Formik
          initialValues={{
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
                  htmlFor="matricNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Matric No (Student ID)
                </label>
                <Field
                  type="text"
                  id="matricNo"
                  name="matricNo"
                  placeholder="Enter your Matric No"
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
                  {isSubmitting ? "Logging In..." : "Log In"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="pt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/student/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
