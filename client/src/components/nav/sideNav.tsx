import { LayoutGrid, CalendarCheck2, ShieldCheck, LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Avatar from "../../assets/favAvatar.png";

function SideNav() {
  interface SideNavItem {
    id: number;
    title?: string;
    route: string;
    activeImage?: React.ReactNode;
    onClick?: () => void; // Add onClick handler
  }

  const curr_route = usePathname();

  const handleLogout = async () => {
    window.location.href = "/"; // Redirect to homepage after logout
  };

  const SideNavData: SideNavItem[] = [
    {
      id: 1,
      title: "Voting Events",
      activeImage: <LayoutGrid />,
      route: "/voting/votingEvents",
    },
    {
      id: 2,
      title: "Creating Events",
      activeImage: <LayoutGrid />,
      route: "/voting/creatingEvents",
    },
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

  return (
    <div className="h-[90vh] w-1/4 fixed md:h-screen p-3 md:p-5 border-2 shadow-sm">
      <div className="text-4xl font-bold text-blue-600 pl-4">Voters</div>
      {SideNavData.map((data) => (
        <div
          key={data.id}
          className={`flex mt-4 gap-2 items-center font-medium text-gray-500 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 ${
            curr_route == data.route && "text-primary bg-blue-300"
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
          {/*Here, I will later update it to take the student matric no when logged in */}
          <p>190809050</p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
