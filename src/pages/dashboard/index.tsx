import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import profile from "../../assets/Images/profile.png";
import WorkArea from "../../components/workArea";

const Dashboard: React.FC = () => {
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex relative flex-col select-none">
      <nav className="lg:w-full w-svw h-16 bg-[#1D1D41] flex py-3 sticky z-20 top-0 justify-between lg:px-20 px-4 self-center">
        <div className="self-center" onClick={handleHomeClick}>
          <h4 className="text-[#ffff] font-bold lg:text-2xl text-xl">
            Desk<span className="text-[#F16A23]">Mate</span>
          </h4>
        </div>
        <div className="my-auto flex items-center gap-6">
          <div className="relative w-full sm:hidden lg:block">
            <ExpandLessRoundedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-180 text-white" />
            <input
              type="text"
              placeholder="Navalur, Alpha Block"
              defaultValue={"Navalur, Alpha Block"}
              className="w-full text-white text-sm font-medium font-sans rounded-md py-2 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>
          <Badge
            badgeContent={4}
            color="warning"
            className="sm:hidden lg:block"
          >
            <NotificationsNoneOutlinedIcon className="text-white" />
          </Badge>
          <div className="flex items-center gap-2">
            <Avatar
              alt="Remy Sharp"
              src={profile}
              sx={{ width: 34, height: 34 }}
            />
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Settings
              </button>
              <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Logout
              </button>
            </div>

            <p className="text-sm font-semibold text-white">JayaKumar</p>
          </div>
        </div>
      </nav>
      <div className="h-full w-full mx-auto flex flex-col px-4 lg:px-20 gap-10 py-10 overflow-y-auto">
   
        <WorkArea />
      </div>
    </div>
  );
};

export default Dashboard;
