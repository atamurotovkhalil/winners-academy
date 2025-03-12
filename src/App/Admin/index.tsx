import { useState, useEffect, useMemo, JSX } from "react";
import Users from './Users/index'
import Lessons from "./Lessons/index";
import { useUserStore } from "@/components/Signup/store/user-store";
import { Link } from "react-router";
import { baseURL } from "@/lib/baseURL";
import Articles from "./Articles/index";
import avatar from "./../../assets/avatar6.png";

export default function AdminPage() {
  const currentUser = useUserStore((state: any) => state.currentUser);
  const fetchUserData = useUserStore((state: any) => state.fetchUserData);
  const [showComponent, setShowComponent] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Memoized component rendering
  const RenderComponent = useMemo(() => {
    const components: { [key: number]: JSX.Element } = {
      0: <Users />,
      1: <Lessons />,
      2: <Articles />,
      3: <Link to="/admin/users">Users</Link>,
      4: <Link to="/admin/products">Products</Link>,
    };
    return components[showComponent] || null;
  }, [showComponent]);
   console.log(currentUser)
    if (currentUser?.type !== "ADMIN") {
      return (
        <div className="text-center text-xl font-bold mt-10">
          <p>Only Admins can access this page.</p>
        </div>
      );
    }

  return (
    <div
      key={currentUser?._id}
      className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-5"
    >
      {/* Sidebar */}
      <div className="flex flex-row lg:flex-col justify-center items-center gap-5 lg:w-1/5">
        {/* Admin Info */}
        <div className="flex justify-center items-center gap-3 shadow-md p-3 rounded-xl my-8 w-72 border-b-2 border-primary">
          <img
            src={currentUser?.image?.[0] ? `${baseURL}${currentUser.image[0]}` : avatar}
            alt="admin"
            className="w-20 h-20 rounded-full border-4 border-primary"
          />
          <div className="ml-2">
            <p className="text-2xl font-bold text-primary">Admin</p>
            <p className="text-xl">01028301155</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        {["Users", "Lessons", "Articles"].map((label, index) => (
          <button
            key={label}
            onClick={() => setShowComponent(index)}
            className={`px-4 py-2 text-2xl lg:text-3xl font-medium lg:w-72 h-16 border-b-2 rounded-2xl border-primary shadow-md transition-all duration-300 
              ${
                showComponent === index
                  ? "bg-primary text-white"
                  : " hover:bg-primary hover:text-white"
              }`}
          >
            {label}
          </button>
        ))}
        <Link
          to="/mypage"
          className="px-4 py-2 mx-auto text-2xl text-center lg:text-3xl font-medium lg:w-72 h-16 border-b-2 rounded-2xl border-primary shadow-md transition-all duration-300 hover:bg-primary hover:text-white ml-auto"
        >
          My Page
        </Link>
      </div>
      <div className="lg:w-4/5 mt-16">{RenderComponent}</div>
    </div>
  );
}
