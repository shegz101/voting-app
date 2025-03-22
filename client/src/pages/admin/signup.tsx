import { useState } from "react";
import Image from "next/image";
import AuthBg from "../../assets/authimg.png";
import { useRouter } from "next/router";
import PasswordInput from "@/components/auth/PasswordInput";
import { adminSignUp } from "@/utils/authUtils";

const AdminSignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/login");
    // try {
    //   // const result = await adminSignUp(fullName, email, password);
    //   // console.log(fullName, email, password);
    //   // alert("Sign Up Successful!");
    //   router.push("/admin/login");
    //   // console.log(result);
    // } catch (error) {
    //   alert("Error signing up");
    // }
    // setFullName("");
    // setEmail("");
    // setPassword("");
  };

  const router = useRouter();
  const handleAdminLoginNav = () => router.push("/admin/login");

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
        <h2 className="text-2xl pb-4 font-semibold text-gray-700">
          Welcome to Voters!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
              Sign Up
            </button>
          </div>
        </form>

        <p className="pt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={handleAdminLoginNav}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminSignUp;
