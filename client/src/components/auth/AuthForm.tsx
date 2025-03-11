import React, { useState } from "react";
import PasswordInput from "./PasswordInput";

type AuthFormProps = {
  isSignUp: boolean;
  role: "admin" | "student";
  handleSubmit: (e: React.FormEvent) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({
  isSignUp,
  role,
  handleSubmit,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSignUp && (role === "admin" || role === "student") && (
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
      )}

      {role === "admin" && (
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
      )}

      {role === "student" && (
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
      )}

      <PasswordInput password={password} setPassword={setPassword} />

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
