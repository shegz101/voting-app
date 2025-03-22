import AuthForm from "../../components/auth/AuthForm";
import Image from "next/image";
import AuthBg from "../../assets/authimg.png";

import { useRouter } from "next/router";

const StudentLogin: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/voting/votingEvents");
    console.log("Student Log In");
  };

  const router = useRouter();
  const handleStudentLoginNav = () => router.push("/student/signup");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full sm:w-1/2 flex justify-center items-center">
        <Image
          // objectFit="cover"
          src={AuthBg}
          alt="Auth Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full sm:w-1/2 bg-white p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 pb-4">
          Welcome Back
        </h2>
        <AuthForm isSignUp={false} role="student" handleSubmit={handleSubmit} />

        <p className="pt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={handleStudentLoginNav}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
