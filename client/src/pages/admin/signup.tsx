/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import AuthBg from "../../assets/authimg.png";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminSignUp } from "@/utils/authUtils";

// Yup Validation Schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AdminSignUp: React.FC = () => {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (values: any) => {
    if (values.email == "segunbobate@gmail.com") {
      try {
        console.log("Form Values: ", values);
        // Call API here with adminSignUp function (make sure the backend API is set up correctly)
        const result = await adminSignUp(
          values.fullName,
          values.email,
          values.password
        );

        if (result) {
          // Success Notification
          toast.success("Signup Successful! Redirecting to login...");
          router.push("/admin/login"); // Redirect to login page
          console.log("Admin Sign Up", result);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error?.message || "Error logging in");
        } else {
          // Handle case where error isn't an instance of Error
          toast.error("An unexpected error occurred");
        }
      }
    } else {
      toast.error("You are not an eligible Admin");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden w-full sm:w-1/2 md:flex justify-center items-center">
        <Image
          objectFit="cover"
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
            email: "",
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
                  placeholder="Enter your Full Name"
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email.."
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
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
                  placeholder="Enter your password.."
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
            onClick={() => router.push("/admin/login")}
          >
            Login
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminSignUp;
