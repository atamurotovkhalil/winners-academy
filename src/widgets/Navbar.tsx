import { SetStateAction, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router";
import w from "../assets/sticker.png";
import A from "../assets/sticker1.png";
import Teachers from "../assets/teachers.png";
import Home from "../assets/home.png";
import User from "../assets/user.png";
import Lessons from "../assets/lessons.png";
import Community from "../assets/partners.png";
import { BsPersonCircle } from "react-icons/bs";
import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";
import { FaFacebook, FaInstagramSquare, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
  const [menu, setMenu] = useState<SetStateAction<boolean>>(false);
  const { fetchUserData, currentUser } = useCurrentUserStore();

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [currentUser, fetchUserData]);

  return (
    <div
      className=" fixed drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
      object-cover  z-10 bg-white w-full top-0"
    >
      <div className=" lg:mx-12 md:mx-4 lg:py-1">
        <div className="">
          <div className="flex  items-center  justify-between ">
            <div className="flex">
              <div className="flex  m-1  bg-wite py-1">
                <img
                  className="w-[22px] h-[30px] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover  pb-3 translate-x-2 "
                  src={w}
                />
                <img
                  className="w-[22px] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover pt-2 h-[30px] -translate-x-1 "
                  src={A}
                />
              </div>
              <div
                className="text-end drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
      object-cover sm:hidden hidden lg:flex md:flex justify-center items-end text-[10px]"
              >
                <p className="italic mb-4 font-bold">
                  <span className="text-[#fc8100]  font-bold text-[22px]">
                    W
                  </span>
                  <span className="text-black text-[22px]">inners</span>
                </p>
                <span className="italic font-bold">
                  {" "}
                  <span className="text-[#fc8100] text-[22px]">A</span>
                  <span className="text-black text-[22px]">cademy</span>
                </span>
              </div>
              <div className="text-end lg:hidden md:hidden flex justify-center items-end text-[10px]">
                <p className="italic text-[12px] font-bold">
                  <span className="text-[#fc8100]  font-bold text-[16px]">
                    E
                  </span>
                  <span className="text-black">veryone can be</span> <br />
                  <span className="italic font-bold">
                    {" "}
                    <span className="text-[#fc8100] text-[16px]">W</span>
                    <span className="text-black">inner</span>
                  </span>
                </p>
              </div>
            </div>
            <div
              className="flex items-center justify-end gap-2 drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
      object-cover"
            >
              <div className="">
                <div className="lg:flex md:hidden sm:hidden hidden flex-row items-center text-center justify-center">
                  <ul className="flex flex-row bg-[#fc8100]  items-center space-x-2 justify-between lg:px-8  14:px-8 text-black   font-bold-100 rounded-sm">
                    <Link
                      to="/"
                      onClick={() => setMenu(false)}
                      className="p-1 m-1 hover:bg-[#fc8100] hover:text-[#1C1C33]  text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-[#1c1c33cb] w-full rounded-xl"
                    >
                      {" "}
                      <div className="flex lg:w-30 md:w-28  items-center justify-between">
                        <img className="w-[14px] ml-3" src={Home} />
                        <p className="mx-auto lg:text-[12px] md:text-[8px]">
                          HOME
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/lessons"
                      onClick={() => setMenu(false)}
                      className="p-1 m-1 hover:bg-[#fc8100] hover:text-[#1C1C33] text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-[#1C1C33] w-full rounded-xl"
                    >
                      {" "}
                      <div className="flex lg:w-30 md:w-28   items-center justify-evenly">
                        {" "}
                        <img className="w-[14px] ml-3" src={Lessons} />
                        <p className="mx-auto md:text-[8px]  lg:text-[12px]">
                          LESSONS
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/teachers"
                      onClick={() => setMenu(false)}
                      className="p-1 m-1 hover:bg-[#fc8100] hover:text-[#1C1C33] text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-[#1c1c33c5] w-full rounded-xl"
                    >
                      {" "}
                      <div className="flex lg:w-30 md:w-28  items-center justify-evenly">
                        <img className="w-[14px]  ml-0" src={Teachers} />
                        <p className="mx-auto lg:text-[12px] md:text-[8px]">
                          TEACHERS
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/community"
                      onClick={() => setMenu(false)}
                      className="p-1 m-1 hover:bg-[#fc8100] hover:text-[#1C1C33] text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-[#1C1C33] w-full rounded-xl"
                    >
                      {" "}
                      <div className="flex lg:w-30 md:w-28  items-center justify-evenly">
                        <img className="w-[14px] ml-3" src={Community} />
                        <p className="mx-auto lg:text-[12px] md:text-[8px]">
                          W-COMMUNITY
                        </p>
                      </div>
                    </Link>
                    {currentUser && (
                      <Link
                        to="/mypage"
                        onClick={() => setMenu(false)}
                        className="p-1 m-1 hover:bg-[#fc8100] hover:text-[#1C1C33] text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-[#1C1C33] w-full rounded-xl"
                      >
                        {" "}
                        <div className="flex lg:w-30 md:w-28  items-center justify-evenly">
                          <img className="w-[14px] ml-3" src={User} />
                          <p className="mx-auto lg:text-[12px] md:text-[8px]">
                            MY PAGE
                          </p>
                        </div>
                      </Link>
                    )}
                    {!currentUser && (
                      <Link
                        to="/signup"
                        className="p-1 m-1 hover:bg-[#fc8100] hover:text-[#1C1C33] text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-[#1C1C33]  rounded-xl"
                      >
                        {" "}
                        <div className="flex    items-center justify-evenly">
                          <p className="mx-auto ">
                            <BsPersonCircle className="w-[14px]" />
                          </p>
                        </div>
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex relative items-center md:flex lg:hidden justify-between pr-2 h-12">
                <div
                  className="drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]
                    object-cover text-black cursor-pointer"
                >
                  {menu ? (
                    <AiOutlineClose
                      onClick={() => setMenu(false)}
                      className="drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover text-[#1C1C33]"
                      size={20}
                    />
                  ) : (
                    <AiOutlineMenuFold
                      onClick={() => setMenu(true)}
                      className="drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover text-[#1C1C33]"
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>

            <div
              className={
                menu
                  ? `fixed z-50   right-0 top-[100%] w-[70%] h-[95%] border-l rounded-l-md border-l-gray-900  ease-in-out duration-300
                   lg:hidden    sm:w-[100%] 
                  md:w-[30%]   text-black  
                backdrop-blur-2xl  rounded-b-md  duration-500 cursor-pointer`
                  : "fixed lg:hidden left-[-100%]"
              }
            >
              <div className=" bg-[#1C1C33]/60">
                <div>
                  <div className="flex flex-col items-center text-center justify-center h-96">
                    <ul className="flex flex-col items-center space-y-2 justify-center px-8 w-[90%]  text-black  bg-[#fc8100] font-bold-100 rounded-sm h-72">
                      <li
                        onClick={() =>setMenu(false)}
                        className="p-2  text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1c1c33cb] w-full rounded-xl"
                      >
                        {" "}
                        <Link
                          className="flex items-center justify-between"
                          to="/"
                        >
                          <img className="w-[25px]" src={Home} />
                          <p className="mx-auto text-[12px]">HOME</p>
                        </Link>
                      </li>
                      <li
                        onClick={() =>setMenu(false)}
                        className="p-2 text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1C1C33] w-full rounded-xl"
                      >
                        {" "}
                        <Link
                          className="flex  items-center justify-evenly"
                          to="/lessons"
                        >
                          {" "}
                          <img className="w-[25px]" src={Lessons} />
                          <p className="mx-auto text-[12px]">LESSONS</p>
                        </Link>
                      </li>
                      <li
                        onClick={() =>setMenu(false)}
                        className="p-2 text-[#fc8100] drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
object-cover bg-[#1c1c33c5] w-full rounded-xl"
                      >
                        {" "}
                        <Link
                          className="flex items-center justify-evenly"
                          to="/teachers"
                        >
                          <img className="w-[25px] ml-0" src={Teachers} />
                          <p className="mx-auto text-[12px]">TEACHERS</p>
                        </Link>
                      </li>
                      <li
                        onClick={() =>setMenu(false)}
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
                        onClick={() =>setMenu(false)}
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
                          onClick={() => setMenu(false)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
