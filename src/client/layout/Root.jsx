


import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarMain from "./TopNavbar";
import "./Root.less";

export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    
      
    </>
  );
}
