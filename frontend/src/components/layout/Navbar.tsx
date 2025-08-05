import { ImBooks } from "react-icons/im";
import { IoLibrary } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { NavItem } from "../ui/NavItem";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b-2 border-blue-300 px-6 py-3 min-h-[60px] flex items-center relative">
      <div className="absolute flex items-center left-4">
        <IoLibrary className="text-blue-400 text-2xl mx-2" />
        <div className="flex flex-col leading-none">
          <span className="text-blue-300 font-bold">LIBRARY</span>
          <span className="text-blue-300 font-bold">LOANS</span>
        </div>
      </div>
      <ul className="flex space-x-20 items-center mx-auto">
        <NavItem to="/Books" text={"Books"} icon={ImBooks} />
        <NavItem to="/Readers" text={"Readers"} icon={FaUserFriends} />
        <NavItem to="/Loans" text={"Loans"} icon={CiBookmarkCheck} />
      </ul>
    </nav>
  );
};
