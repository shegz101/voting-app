import React, { useState } from "react";

import { useRouter } from "next/router";

const LandingPage: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showCenterDropdown, setCenterShowDropdown] = useState<boolean>(false);

  const router = useRouter();
  const handleAdminClick = () => router.push("/admin/login");
  const handleStudentClick = () => router.push("/student/signup");

  const toggleDropdown = (): void => setShowDropdown(!showDropdown);

  const toggleCenterDropdown = (): void =>
    setCenterShowDropdown(!showCenterDropdown);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-start text-center">
      {/* Navigation Bar */}
      <nav className="w-full py-4 px-4 md:px-8 flex justify-between items-center border-b-2 shadow-md">
        <div className="text-4xl font-bold text-blue-600">Voters</div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg shadow-lg"
          >
            Get Started
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 cursor-pointer">
              <ul>
                <li>
                  <button
                    className="block px-4 py-2 text-blue-600 cursor-pointer"
                    onClick={handleAdminClick}
                  >
                    Admin
                  </button>
                </li>
                <div className="w-full border-[0.5px] border-gray-400" />
                <li>
                  <button
                    className="block px-4 py-2 text-blue-600 cursor-pointer"
                    onClick={handleStudentClick}
                  >
                    Student
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-5xl font-bold text-black mb-4">
          Manage Your Voting
        </h1>
        <h1 className="text-5xl font-bold text-blue-500 mb-6">
          Control your Voters
        </h1>
        <p className="text-gray-500 font-medium text-xl">
          Enjoy a seamless voting experience!
        </p>
        <div className="relative">
          <button
            className="bg-blue-600 text-white py-3 px-8 rounded-[12px] shadow-lg mt-4"
            onClick={toggleCenterDropdown}
          >
            Get Started
          </button>
          {showCenterDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 cursor-pointer">
              <ul>
                <li>
                  <button
                    className="block px-4 py-2 text-blue-600 cursor-pointer"
                    onClick={handleAdminClick}
                  >
                    Admin
                  </button>
                </li>
                <div className="w-full border-[0.5px] border-gray-400" />
                <li>
                  <button
                    className="block px-4 py-2 text-blue-600 cursor-pointer"
                    onClick={handleStudentClick}
                  >
                    Student
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Trusted by */}
      <div className="w-full flex justify-start mt-20 px-8">
        <p className="text-xl font-bold text-black mb-4">
          <span className="text-blue-500">Trus</span>ted{" "}
          <span className="text-blue-500">By</span>:
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
