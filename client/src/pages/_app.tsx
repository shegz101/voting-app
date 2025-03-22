import { AppProps } from "next/app";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout"; // Import your dashboard layout
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const authPages = [
    "/admin/login",
    "/admin/signup",
    "/student/login",
    "/student/signup",
    "/",
  ];

  // Check if the current pathname matches any auth page
  const neglectPage = authPages.includes(router.pathname);

  return (
    <div>
      {/* Render the DashboardLayout only if we are not on the LandingPage and Auth Pages */}
      {!neglectPage ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
