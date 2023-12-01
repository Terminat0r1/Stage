import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarMain from "./TopNavbar";
import "./Root.less";

export default function Root() {
  return (
    <>
    
{/* {currentPage === "login"  && <Navbar/>} */}





      <Navbar/>
       <NavbarMain/> {/*this will be removed, it's just to test the new navbar and for mobility  */}

      <main>
        <Outlet />
      </main>
    
      
    </>
  );
}
