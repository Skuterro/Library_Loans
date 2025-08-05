import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";

interface NavItemProps {
  to: string;
  text: string;
  icon: IconType;
}

export const NavItem = ({to, text, icon:Icon} : NavItemProps) => {
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