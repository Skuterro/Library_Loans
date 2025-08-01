import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";
import { ImBooks } from "react-icons/im";
import { IoLibrary } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b-2 border-blue-300 px-6 py-3 min-h-[60px] flex items-center relative">
      <div className="absolute flex items-center left-4">
        <IoLibrary className="text-blue-400 text-2xl mx-2"/>
        <div className="flex flex-col leading-none">
          <span className="text-blue-300 font-bold">LIBRARY</span>
          <span className="text-blue-300 font-bold">LOANS</span>
        </div>
      </div>
      <ul className="flex space-x-20 items-center mx-auto">
        <NavItem to="/Books" text={("Books")} icon={ImBooks} />
        <NavItem to="/Readers" text={("Readers")} icon={FaUserFriends} />
      </ul>
    </nav>
  )
}

interface NavItemProps {
  to: string;
  text: string;
  icon: IconType;
}

const NavItem = ({to, text, icon:Icon} : NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 font-bold px-3 py-2 rounded-xl transition-colors duration-200 ${
          isActive
            ? "bg-blue-500 text-white shadow-md ring-2 ring-blue-300"
            : "text-gray-400 hover:text-white hover:bg-gray-700"
        }`
      }
    >
      {text}
      <Icon className="text-2xl"/>
    </NavLink>
  )
}