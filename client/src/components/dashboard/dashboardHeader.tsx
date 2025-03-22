import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import SideNav from "../nav/sideNav";
import Image from "next/image";
import Avatar from "../../assets/favAvatar.png";

const DashboardHeader = () => {
  const [trackHamburgerIcon, setTrackHamburgerIcon] = useState<boolean>(false);

  const handleSideNavReveal = () => {
    setTrackHamburgerIcon(!trackHamburgerIcon);
  };
  return (
    <div className="p-3 md:p-6 shadow-sm border-b-2">
      <div className="flex justify-between">
        {/* Search Bar */}
        <div className="gap-2 items-center flex">
          <button
            className="text-primary md:hidden"
            onClick={handleSideNavReveal}
          >
            {trackHamburgerIcon ? <X /> : <MenuIcon />}
          </button>
          <h2 className="font-bold text-lg text-blue-600">
            Voting Application
          </h2>
        </div>

        {/* Put default avatar here */}
        <div className="w-[30px] h-[30px]">
          <Image src={Avatar} alt="The Avatar Image" />
        </div>
      </div>
      <div className="bg-white m-[-12px] md:m-[-20px] md:hidden mt-3 w-[85vw] absolute z-20">
        {trackHamburgerIcon && (
          <div className="bg-white">
            <SideNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
