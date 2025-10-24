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
import MobileNavbar from "./MobileNavbar";
import { BsPersonCircle } from "react-icons/bs";
import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";
import { ModeToggle } from "@/components/mode-toggle";

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
              <div className="">
                <ModeToggle />
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
                  ? `fixed z-10 lg:hidden  right-0  top-[100%] sm:w-[100%] md:w-[30%] w-[100%]  text-black  bg-[#1C1C33]/60
                backdrop-blur-2xl  rounded-b-md ease-in-out duration-500 cursor-pointer`
                  : "fixed lg:hidden top-[-1000%]"
              }
            >
              <div>
                <MobileNavbar setMenu={setMenu} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
