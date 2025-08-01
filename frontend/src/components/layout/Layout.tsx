import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { Wrapper } from "./Wrapper";

export const Layout = () => (
    <div className="bg-gray-800 text-gray-300 min-h-screen">
      <Navbar />
      <Wrapper>
        <main>
            <Outlet />
        </main>
      </Wrapper>
    </div>
  );