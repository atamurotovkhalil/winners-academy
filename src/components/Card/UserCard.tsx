import { AiFillExperiment } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { MdGrade } from "react-icons/md";
import WinnersLogo from "../../widgets/WinnersLogo";
import { User } from "@/Types/UserType";
import { baseURL } from "@/lib/baseURL";

type Prop = {
  user: User;
};

const UserCard = ({ user }: Prop) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div data-aos="slide-up" className="flex items-center justify-center">
        <div className="lg:border-2 border-2 rounded-xl lg:w-full sm:w-96 md:w-64 w-70 border-[#fc8100] bg-white shadow-lg shadow-[#fc810080] hover:scale-105 transition-all duration-300">
          {/* Logo */}
          <div className="my-3 flex items-center justify-center">
            <WinnersLogo />
          </div>
          {/* Name */}
          <p
            className="font-bold text-center text-[#fc8100] text-lg truncate"
            title={user?.name}
          >
            {user?.name}
          </p>
          {/* Profile Image */}
          <div className="flex items-center border-t border-b border-[#fc8100] justify-center py-3">
            <img
              src={
                user?.attachPath
                  ? `${baseURL}${user.attachPath}`
                  : user?.attach?.path
                  ? `${baseURL}${user.attach.path}`
                  : "/default-avatar.png"
              }
              alt="User Image"
              className="w-32 h-32 object-cover rounded-full border-2 border-[#fc8100] shadow-md"
            />
          </div>

          {/* Details */}
          <div className="p-4 flex flex-col gap-2">
            {/* Name */}
            <div className="flex gap-2 items-center border-b pb-2">
              <AiFillExperiment className="text-[#fc8100] text-lg" />
              <p className="text-gray-700 truncate" title={user?.name}>
                {user?.name
                  ? `${user.name.slice(0, 10)}${
                      user.name.length > 10 ? "..." : ""
                    }`
                  : "No address"}
              </p>
            </div>

            {/* Address */}
            <div className="flex gap-2 items-center border-b py-2">
              <FaLocationDot className="text-[#fc8100] text-lg" />
              <p
                className="text-gray-700 break-words max-w-full"
                title={user?.address}
              >
                {user?.address
                  ? `${user.address.slice(0, 20)}${
                      user.address.length > 20 ? "..." : ""
                    }`
                  : "No address"}
              </p>
            </div>

            {/* Phone */}
            <div className="flex gap-2 items-center border-b py-2">
              <SiGmail className="text-[#fc8100] text-lg" />
              <p className="text-gray-700 truncate" title={user?.phone}>
                {user?.phone
                  ? `${user.phone.slice(0, 15)}${
                      user.phone.length > 15 ? "..." : ""
                    }`
                  : "No email provided"}
              </p>
            </div>

            {/* Level */}
            <div className="flex gap-2 items-center border-b py-2">
              <MdGrade className="text-[#fc8100] text-lg" />
              <p className="text-gray-700 truncate" title={user?.level}>
                {user?.level || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
