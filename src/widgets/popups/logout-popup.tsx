import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";
import React from "react";
import { RiEmotionNormalFill } from "react-icons/ri";
import { useNavigate } from "react-router";

type LogoutPopupProps = {
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogoutPopup({ setShowLogout }: LogoutPopupProps) {
  const navigate = useNavigate();
  const fetchUserData = useCurrentUserStore((state) => state.fetchUserData);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-primary/50 backdrop-blur-sm  px-4">
      <div className="bg-white/90 rounded-2xl shadow-lg w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg p-6 animate-fade-in">
        <div className="flex flex-col items-center text-center text-black">
          <RiEmotionNormalFill className="w-16 h-16 text-primary mb-3" />
          <h1 className="text-2xl sm:text-3xl font-semibold">Really?</h1>
          <p className="mt-2 text-sm sm:text-base">
            Are you sure you want to log out?
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full justify-center">
            <button
              className="w-full sm:w-auto px-8 py-2 text-white bg-primary hover:bg-primary-dark rounded-md transition"
              onClick={() => {
                localStorage.removeItem("token");
                fetchUserData();
                navigate("/login");
                window.location.href = "/login";
                setShowLogout(false);
              }}
            >
              Confirm
            </button>
            <button
              className="w-full sm:w-auto px-8 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition"
              onClick={() => setShowLogout(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
