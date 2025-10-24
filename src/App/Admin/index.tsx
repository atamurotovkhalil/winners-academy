import { useState, useEffect, useMemo, JSX } from "react";
import Users from "./Users/index";
import Lessons from "./Lessons/index";
import Articles from "./Articles/index";
import { Link } from "react-router";
import { baseURL } from "@/lib/baseURL";
import avatar from "./../../assets/avatar6.png";
import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";
import { User } from "@/Types/UserType.ts";

export default function AdminPage() {
  const currentUser: User = useCurrentUserStore(
    (state: any): User => state.currentUser
  );
  const fetchUserData = useCurrentUserStore(
    (state: any) => state.fetchUserData
  );
  const [showComponent, setShowComponent] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const RenderComponent = useMemo(() => {
    const components: { [key: number]: JSX.Element } = {
      0: <Users />,
      1: <Lessons />,
      2: <Articles />,
    };
    return components[showComponent] || null;
  }, [showComponent]);

  if (currentUser?.profileRole !== "ROLE_ADMIN") {
    return (
      <div className="text-center text-lg sm:text-xl font-bold mt-10 px-4">
        <p>Only Admins can access this page.</p>
      </div>
    );
  }

  return (
    <div
      key={currentUser?.id}
      className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-5 px-2 sm:px-6 py-6"
    >
      {/* Sidebar / Top Nav */}
      <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-4 sm:gap-6 w-full lg:w-1/5">
        {/* Admin Info */}
        <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-3 shadow-md p-4 sm:p-5 rounded-xl border-b-2 border-primary w-full sm:w-auto lg:w-72">
          <img
            src={
              currentUser?.attach.path
                ? `${baseURL}${currentUser.attach.path}`
                : avatar
            }
            alt="admin"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-primary object-cover"
          />
          <div className="text-center sm:text-left lg:text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary">Admin</p>
            <p className="text-base sm:text-lg text-gray-700">
              {currentUser?.phone}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center lg:flex-col gap-3 w-full sm:w-auto">
          {["Users", "Lessons", "Articles"].map((label, index) => (
            <button
              key={label}
              onClick={() => setShowComponent(index)}
              className={`w-full sm:w-[180px] lg:w-72 px-4 py-2 text-lg sm:text-xl font-medium border-b-2 rounded-2xl border-primary shadow-md transition-all duration-300 
                ${
                  showComponent === index
                    ? "bg-primary text-white"
                    : "hover:bg-[#fc8100] hover:text-white"
                }`}
            >
              {label}
            </button>
          ))}

          <Link
            to="/mypage"
            className="w-full sm:w-[180px] lg:w-72 px-4 py-2 text-lg sm:text-xl text-center font-medium border-b-2 rounded-2xl border-primary shadow-md transition-all duration-300 hover:bg-[#fc8100] hover:text-white"
          >
            My Page
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 mt-10 lg:mt-0">{RenderComponent}</div>
    </div>
  );
}
