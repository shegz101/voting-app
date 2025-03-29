import { LayoutGrid, CalendarCheck2, ShieldCheck, LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Avatar from "../../assets/favAvatar.png";
import { useState, useEffect } from "react";

function SideNav() {
  interface SideNavItem {
    id: number;
    title: string;
    route: string;
    activeImage?: React.ReactNode;
    onClick?: () => void;
  }

  const curr_route = usePathname();

  const [role, setRole] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [matricNo, setMatricNo] = useState<string | null>(null);

  useEffect(() => {
    // Accessing localStorage only on the client side
    const storedRole = localStorage.getItem("votingRole");
    const storedAdminEmail = localStorage.getItem("adminEmail");
    const storedMatricNo = localStorage.getItem("matricNumber");

    setRole(storedRole);
    setAdminEmail(storedAdminEmail);
    setMatricNo(storedMatricNo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("votingRole");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("matricNumber");
    window.location.href = "/"; // Redirect to homepage or login page after logout
  };

  let SideNavData: SideNavItem[] = [
    {
      id: 3,
      title: "Event Dashboard",
      activeImage: <CalendarCheck2 />,
      route: "/event/eventDb",
    },
    {
      id: 4,
      title: "Update",
      activeImage: <ShieldCheck />,
      route: "/update/updateUser",
    },
    {
      id: 5,
      title: "Logout",
      activeImage: <LogOut />,
      route: "#",
      onClick: handleLogout, // Attach the logout handler
    },
  ];

  // Add role-based items
  if (role === "student") {
    SideNavData = [
      {
        id: 1,
        title: "Voting Events",
        activeImage: <LayoutGrid />,
        route: "/voting/votingEvents",
      },
      ...SideNavData, // Keep the common items for both students and admins
    ];
  }

  if (role === "admin") {
    SideNavData = [
      {
        id: 2,
        title: "Creating Events",
        activeImage: <LayoutGrid />,
        route: "/voting/creatingEvents",
      },
      ...SideNavData, // Keep the common items for both students and admins
    ];
  }

  return (
    <div className="h-[90vh] w-1/4 fixed md:h-screen p-3 md:p-5 border-2 shadow-sm">
      <div className="text-4xl font-bold text-blue-600 pl-4">Voters</div>
      {SideNavData.map((data) => (
        <div
          key={data.id}
          className={`flex mt-4 gap-2 items-center font-medium text-gray-500 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 ${
            curr_route === data.route && "text-primary bg-blue-300"
          }`}
          onClick={
            data.onClick
              ? data.onClick
              : () => (window.location.href = data.route)
          }
        >
          <p>{data.activeImage}</p>
          <h1>{data.title}</h1>
        </div>
      ))}
      <div className="md:fixed text bottom-[10px] md:bottom-10 flex p-3 md:p-5 gap-2 items-center">
        <div className="w-[30px] h-[30px]">
          <Image src={Avatar} alt="The Avatar Image" />
        </div>
        <div className="text-gray-500 text-wrap">
          {/* This can be updated to take the student matric number or admin username when logged in */}
          <p>{role === "student" ? `${matricNo}` : `${adminEmail}`}</p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
