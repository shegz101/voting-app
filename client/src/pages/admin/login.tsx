import Image from "next/image";
import AuthBg from "../../assets/authimg.png";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "@/utils/authUtils"; // Ensure you have this API function

// Yup Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AdminLogin: React.FC = () => {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      // Call the admin login API
      const result = await adminLogin(values.email, values.password);

      if (result) {
        console.log(result); // Log the result for debugging
        // save admin token to localStorage
        localStorage.setItem("adminToken", result?.token || "");
        // Set the role in localStorage if login is successful
        localStorage.setItem("votingRole", "admin");
        localStorage.setItem("adminEmail", values.email);
        toast.success(result?.message || "Login Successful! Redirecting...");
        router.push("/voting/creatingEvents");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message || "Error logging in");
      } else {
        // Handle case where error isn't an instance of Error
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full sm:w-1/2 flex justify-center items-center">
        <Image
          objectFit="cover"
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
