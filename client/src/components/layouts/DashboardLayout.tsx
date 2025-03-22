import React from "react";
import SideNav from "../nav/sideNav"; // Import the SideNav component
import DashboardHeader from "../dashboard/dashboardHeader"; // Import the Dashboard Header component

type DashboardLayoutProps = {
  children: React.ReactNode; // This will allow passing of child components (like the pages)
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Side navigation component */}
      <div className="w-1/4">
        <SideNav />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Main content - children component */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
