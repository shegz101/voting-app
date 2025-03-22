import { useState } from "react";
import Image from "next/image";
import AuthBg from "../../assets/authimg.png";

import axios from "axios";

import { useRouter } from "next/router";
import PasswordInput from "@/components/auth/PasswordInput";

const StudentSignUp: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/student/login");
  };

  const handleStudentLoginNav = () => router.push("/student/login");

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
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID (Matric No)
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter your Student ID"
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
            onClick={handleStudentLoginNav}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentSignUp;
