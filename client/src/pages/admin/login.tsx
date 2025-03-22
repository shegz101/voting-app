import { useState } from "react";
import Image from "next/image";
import AuthBg from "../../assets/authimg.png";
// import { adminLogin } from "@/utils/authUtils";

import { useRouter } from "next/router";
import PasswordInput from "@/components/auth/PasswordInput";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/voting/creatingEvents");
    // try {
    //   const result = await adminLogin(email, password);
    //   console.log(email, password);
    //   alert("Logged In Successful!");
    //   console.log(result); // Handle the response as needed (e.g., storing the token)
    // } catch (error) {
    //   alert("Error signing up");
    // }
  };

  const handleAdminLoginNav = () => router.push("/admin/signup");

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <PasswordInput password={password} setPassword={setPassword} />

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="pt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={handleAdminLoginNav}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
