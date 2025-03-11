import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute cursor-pointer inset-y-0 right-3 flex items-center"
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-600" />
          ) : (
            <FaEye className="text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
