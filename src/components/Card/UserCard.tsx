import { AiFillExperiment } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaInstagramSquare, FaPhoneAlt, FaTiktok } from "react-icons/fa";
import WinnersLogo from "../ui/WinnersLogo";
import { GrCertificate } from "react-icons/gr";
import { User } from "@/Types/UserType";
import { baseURL } from "@/lib/baseURL";
import avatar from "./../../assets/avatar6.png";
type Prop = {
  user: User;
};
const UserCard = ({ user }: Prop) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        data-aos="slide-up"
        className="flex items-center justify-center hover:scale-105 transition-all duration-300"
      >
        <div className="lg:border-2 md:border-1 border-2 rounded-xl lg:w-full sm:w-96 md:w-64 w-70 border-[#fc8100] bg-white shadow-lg shadow-[#fc810080] hover:shadow-xl transition-shadow duration-300">
          <div className="my-3 flex items-center justify-center">
            <WinnersLogo />
          </div>
          <p className="font-bold text-center text-[#fc8100] text-lg">
            {user?.type}
          </p>
          <div className="flex items-center border-t border-b border-[#fc8100] justify-center py-3">
            <img
              src={user?.image?.[0] ? `${baseURL}${user.image[0]}` : avatar}
              alt="User Image"
              className="w-32 h-32 object-cover rounded-full border-2 border-[#fc8100] shadow-md"
            />
          </div>
          <div className="p-4">
            <div className="flex gap-2 items-center border-b pb-2">
              <AiFillExperiment className="text-[#fc8100] text-lg" />
              <p className="font-bold"></p>
              <p className="text-gray-700 overflow-hidden">{user?.name}</p>
            </div>
            <div className="flex gap-2 items-center border-b py-2">
              <FaLocationDot className="text-[#fc8100] text-lg" />
              <p className="font-bold"></p>
              <p className="text-gray-700 overflow-hidden">{user?.address}</p>
            </div>
            <div className="flex gap-2 items-center border-b py-2">
              <FaPhoneAlt className="text-[#fc8100] text-lg" />
              <p className="font-bold"></p>
              <p className="text-gray-700 overflow-hidden">{user?.phone}</p>
            </div>
            <div className="flex gap-2 items-center border-b py-2">
              <GrCertificate className="text-[#fc8100] text-lg" />
              <p className="font-bold"></p>
              <p className="text-gray-700">{user?.level}</p>
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="flex justify-center items-center">
              <div className="flex justify-evenly items-center gap-4 py-2 px-4">
                <a href={user?.telegramLink}>
                  <div className="flex items-center justify-center rounded-full p-3 bg-[#fc8100] hover:scale-110 transition-all duration-300 shadow-md">
                    <FaTelegram className="text-white text-xl" />
                  </div>
                </a>
                <a href={user?.tiktokLink}>
                  <div className="flex items-center justify-center rounded-full p-3 bg-[#fc8100] hover:scale-110 transition-all duration-300 shadow-md">
                    <FaTiktok className="text-white text-xl" />
                  </div>
                </a>
                <a href={user?.instagramLink}>
                  <div className="flex items-center justify-center rounded-full p-3 bg-[#fc8100] hover:scale-110 transition-all duration-300 shadow-md">
                    <FaInstagramSquare className="text-white text-xl" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
