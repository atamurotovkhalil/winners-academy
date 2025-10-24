import w from "../assets/sticker.png";
import A from "../assets/sticker1.png";
import {
  FaFacebook,
  FaInstagramSquare,
  FaRegCopyright,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import BottomNavbar from "./BottomNavbar";
import { usePopup } from "./popup-store/popup-store";
import SignupValidatePopup from "./popups/signup-validate-popup";
import SignupErrorPopup from "./popups/signup-error-popup";
import ConfirmPopup from "./popups/confirm-popup";
import ConfirmLesson from "./popups/confirm-lesson";
import LikesPopup from "./popups/likes-popup";
import LogoutPopup from "./popups/logout-popup";
import { useState } from "react";


const Footer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const signuppopup = usePopup((state: any) => state.signuppopup);
  const signuperrorpopup = usePopup((state: any) => state.signuperrorpopup);
  const confirmpopup = usePopup((state: any) => state.confirmpopup);
  const deletelessonpopup = usePopup((state: any) => state.deletelessonpopup);

  const likespopup = usePopup((state: any) => state.likespopup);
  return (
    <div>
      <div className="bg-black pb-5">
        <div className="container mx-auto max-w-6xl py-4 px-4 lg:px-16">
          <div className="bg-green1 text-white">
            <div className=" container md:px-10 sm:px-5 px-1  ">
              <div className="grid lg:grid-cols-6 md:grid-cols-2 justify-between sm:grid-cols-2 grid-cols-1 p-10">
                <div className="col-span-2 gap-4">
                  <div className="flex p-3">
                    <div
                      className="flex rounded-full m-1 drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
                    object-cover bg-gray-200 py-1"
                    >
                      <img className="w-[22px]  pb-3 translate-x-2 " src={w} />
                      <img
                        className="w-[22px] pt-3 h-[30px] -translate-x-1 "
                        src={A}
                      />
                    </div>
                    <p className="text-white flex items-end italic font-thin">
                      Winners Academy
                    </p>
                  </div>
                  <p className="p-3 text-center lg:text-left">
                    Follow Winners Academy
                  </p>
                  <div className="sm:flex flex justify-evenly items-center gap-1 p-2">
                    <div className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:w-12 hover:h-12 transition-all duration-300 bg-[#fc8100]">
                      <FaFacebook className="text-xl text-white" />
                    </div>
                    <div className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:w-12 hover:h-12 transition-all duration-300 bg-[#fc8100]">
                      <FaTwitter className="text-xl text-white" />
                    </div>
                    <div className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:w-12 hover:h-12 transition-all duration-300 bg-[#fc8100]">
                      <FaTiktok className="text-xl text-white" />
                    </div>
                    <div className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:w-12 hover:h-12 transition-all duration-300 bg-[#fc8100]">
                      <FaInstagramSquare className="text-xl text-white" />
                    </div>
                    <div className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:w-12 hover:h-12 transition-all duration-300 bg-[#fc8100]">
                      <FaYoutube className="text-xl text-white" />
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="lg:flex items-start justify-between">
                    <div className=" text-center lg:text-left mb-4">
                      <ul className="inline-block cursor-pointer">
                        <li className="p-2  ">LEARNING PLATFORM</li>
                        <li className="p-2 hover:text-[18px] hover:text-[#fc8100]">
                          HOME
                        </li>
                        <li className="p-2 hover:text-[18px] hover:text-[#fc8100]">
                          LESSONS
                        </li>
                        <li className="p-2 hover:text-[18px] hover:text-[#fc8100]">
                          TEACHERS
                        </li>
                        <li className="p-2 hover:text-[18px] hover:text-[#fc8100]">
                          WINNERS COMMUNITY
                        </li>
                      </ul>
                    </div>

                    <div className=" text-center lg:text-left">
                      <p className="text-2xl p-3">WE ARE HERE</p>
                      <ul className="inline-block">
                        <li className="p-2"> +998905190700</li>
                        <li className="p-2">winnersacademy@gmail.com</li>
                        <li className="p-2">
                          67PH+4J3, Termiz, Surxondaryo Viloyati
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fc8100]">
          <div className=" container mx-auto max-w-6xl py-4 px-4 lg:px-16  hidden sm:hidden md:block lg:block">
            <div className="sm:flex flex justify-between items-center ">
              <div className="flex justify-between items-center gap-3 p-1">
                <p className="text-white flex justify-center items-center">
                  Copyright <FaRegCopyright className="mx-3" /> 2024 Winners
                  Academy English Learning Center. All rights Reserved.
                </p>
              </div>
              <div>
                <div className="flex justify-evenly items-center gap-4 py-2 px-4">
                  <p className="text-white">
                    User Terms & Conditions | Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {signuppopup && (
        <div>
          <SignupValidatePopup />
        </div>
      )}
      {signuperrorpopup && (
        <div>
          <SignupErrorPopup />
        </div>
      )}
      {confirmpopup && (
        <div>
          <ConfirmPopup />
        </div>
      )}
      {deletelessonpopup && (
        <div>
          <ConfirmLesson />
        </div>
      )}
      {likespopup && (
        <div>
          <LikesPopup />
        </div>
      )}
      {showLogout && <LogoutPopup setShowLogout={setShowLogout} />}
      <div
        className=" fixed z-50 lg:hidden md:hidden bottom-0 h-16  sm:w-[100%]  w-[100%]   bg-black/70
                backdrop-blur-2xl  rounded-t-3xl   cursor-pointer"
      >
        <BottomNavbar setShowLogout={setShowLogout}/>
      </div>
    </div>
  );
};

export default Footer;
