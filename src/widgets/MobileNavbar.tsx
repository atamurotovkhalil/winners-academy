import React, { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Teachers from "../assets/teachers.png";
import Home from "../assets/home.png";
import Lessons from "../assets/lessons.png";
import Community from "../assets/partners.png";
import { Link } from "react-router";
import User from "../assets/user.png";
import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";
import { MdAdminPanelSettings } from "react-icons/md";

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNavbar = (props: Props) => {
  const { fetchUserData, currentUser } = useCurrentUserStore();

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [currentUser, fetchUserData]);
  return (
    <div>
      <div>
        <div className="flex flex-col items-center text-center justify-center h-96">
          <ul className="flex flex-col items-center space-y-2 justify-center px-8 w-[90%]  text-black  bg-[#fc8100] font-bold-100 rounded-sm h-72">
            <li
              onClick={() => props.setMenu(false)}
              className="p-2  text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1c1c33cb] w-full rounded-xl"
            >
              {" "}
              <Link className="flex items-center justify-between" to="/">
                <img className="w-[25px]" src={Home} />
                <p className="mx-auto text-[12px]">HOME</p>
              </Link>
            </li>
            <li
              onClick={() => props.setMenu(false)}
              className="p-2 text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1C1C33] w-full rounded-xl"
            >
              {" "}
              <Link className="flex  items-center justify-evenly" to="/lessons">
                {" "}
                <img className="w-[25px]" src={Lessons} />
                <p className="mx-auto text-[12px]">LESSONS</p>
              </Link>
            </li>
            <li
              onClick={() => props.setMenu(false)}
              className="p-2 text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1c1c33c5] w-full rounded-xl"
            >
              {" "}
              <Link className="flex items-center justify-evenly" to="/teachers">
                <img className="w-[25px] ml-0" src={Teachers} />
                <p className="mx-auto text-[12px]">TEACHERS</p>
              </Link>
            </li>
            <li
              onClick={() => props.setMenu(false)}
              className="p-2 text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1C1C33] w-full rounded-xl"
            >
              {" "}
              <Link
                className="flex items-center justify-evenly"
                to="/community"
              >
                <img className="w-[25px]" src={Community} />
                <p className="mx-auto text-[12px]">W-COMMUNITY</p>
              </Link>
            </li>
            <li
              onClick={() => props.setMenu(false)}
              className="p-2 text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1C1C33] w-full rounded-xl"
            >
              {" "}
              <Link
                className="flex items-center justify-evenly"
                to={currentUser ? `/mypage` : `/login`}
              >
                <img className="w-[25px]" src={User} />
                <p className="mx-auto text-[12px]">
                  {currentUser ? "MY PAGE" : "LOGIN/SIGNUP"}
                </p>
              </Link>
            </li>
            {currentUser?.profileRole === "ROLE_ADMIN" && (
              <li
                onClick={() => props.setMenu(false)}
                className="p-2 text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1C1C33] w-full rounded-xl"
              >
                {" "}
                <Link
                  className="flex items-center justify-evenly"
                  to="/admin/admin"
                >
                  <MdAdminPanelSettings size={20} />
                  <p className="mx-auto text-[12px]">ADMIN PAGE</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="w-full mb-8">
          <div className="flex justify-center items-center">
            <div className="flex justify-evenly items-center gap-4 py-2 px-4">
              <div className="flex items-center  justify-center rounded-full p-2  bg-[#fc8100] hover:scale-110 hover:transition-all hover:duration-300">
                <FaFacebook className="text-xl text-white size-7" />
              </div>
              <div className="flex items-center justify-center rounded-full p-2 bg-[#fc8100] hover:scale-110 hover:transition-all hover:duration-300">
                <FaTiktok className="text-xl text-white size-6" />
              </div>
              <div className="flex items-center justify-center rounded-full p-2 bg-[#fc8100] hover:scale-110 hover:transition-all hover:duration-300">
                <FaInstagramSquare className="text-xl text-white size-6" />
              </div>
              <div className="flex items-center justify-center rounded-full p-2 bg-[#fc8100] hover:scale-110 hover:transition-all hover:duration-300">
                <FaYoutube className="text-xl text-white size-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
