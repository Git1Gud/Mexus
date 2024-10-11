// import React, { useEffect } from "react";
import HomeNavbar from './HomeNavbar/HomeNavbar';
import {Navbar,Example} from './index'
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); // Use the useNavigate hook for programmatic navigation

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       if (user.role.toLowerCase() === "teacher") {
//         navigate("/home/teacher");
//       }else{
//         navigate('/home')
//       }
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

  return (
    <div className="flex h-screen">
      <div className="sticky top-0 h-screen shrink-0">
        <Example />
      </div>
      <div className="flex-1 w-full overflow-y-auto">
        <div className="flex flex-col">
          <HomeNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
