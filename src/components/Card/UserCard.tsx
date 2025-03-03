import teacher from "./../../assets/teacher2.avif";
import { AiFillExperiment } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaInstagramSquare, FaPhoneAlt, FaTiktok } from "react-icons/fa";
import WinnersLogo from "../ui/WinnersLogo";
import { GrCertificate } from "react-icons/gr";

const UserCard = () => {
  return (
    <div className="flex   items-center justify-center">
      <div
        data-aos="slide-up"
        className=" flex  items-center justify-center  hover:scale-101 transition-all duration-300 "
      >
        <div className="lg:border-2 md:border-1 rounded-sm lg:w-full sm:w-96 md:w-56 w-80 border-[#fc8100] ">
          <div className="my-1 flex items-center justify-center">
            <WinnersLogo />
          </div>
          <p className="font-bold text-center">Teacher</p>
          <div className="flex items-center border-t border-b border-[#fc8100] justify-center">
            <img
              className="w-55 m-1 h-55 rounded-full object-cover"
              src={teacher}
            />
          </div>
          <div className="m-1 flex gap-2 items-center justify-between">
            <p className="flex items-center font-bold justify-start">
              <AiFillExperiment className="mx-2 text-teal-700" />
              Experience:
            </p>
            <p className=" ">2 years</p>
          </div>
          <div className="m-1 flex gap-2 items-center justify-between">
            <p className="flex items-center font-bold justify-start">
              <FaLocationDot className="mx-2 text-cyan-900" />
              Location:
            </p>
            <p className=" ">Surkhandarya</p>
          </div>
          <div className="m-1 flex gap-2 items-center justify-between">
            <p className="flex items-center font-bold justify-start">
              <FaPhoneAlt className="mx-2 text-lime-700" />
              Phone:
            </p>
            <p className=" ">+998900000000</p>
          </div>
          <div className="m-1 flex gap-2 items-center justify-between">
            <p className="flex items-center font-bold justify-start">
              <GrCertificate className="mx-2 text-yellow-700" />
              Certificate:
            </p>
            <p className=" ">IELTS 7</p>
          </div>
          <div className="w-full mb-3">
            <div className="flex justify-center items-center">
              <div className="flex justify-evenly items-center gap-4 py-2 px-4">
                <div className="flex items-center  justify-center rounded-full p-2  bg-[#fc8100] hover:scale-110 hover:transition-all hover:duration-300">
                  <FaTelegram className="text-sm text-white size-3" />
                </div>
                <div className="flex items-center justify-center rounded-full p-2 bg-[#fc8100] hover:scale-110 hover:transition-all hover:duration-300">
                  <FaTiktok className="text-sm text-white size-3" />
                </div>
                <div className="flex items-center justify-center rounded-full p-2 bg-[#fc8100] hover:scale-110 hover:transition-all hover:duration-300">
                  <FaInstagramSquare className="text-sm text-white size-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
