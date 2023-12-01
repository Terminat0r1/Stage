























































import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarMain from "./TopNavbar";
import "./Root.less";

export default function Root() {
  return (
    <>
    
{/* {currentPage === "login"  && <Navbar/>} */}

 {/* <Navbar/> */}



    

       <NavbarMain/> 
       after the redux store 

      <main>
        <Outlet />
      </main>
    
      
    </>
  );
}
