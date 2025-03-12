import { useEffect } from "react";
import { useUserStore } from "../Signup/store/user-store";
import { baseURL } from "@/lib/baseURL";
import avatar from "./../../assets/avatar6.png";

type Props = {
  userId: string;
};

const RenderUser = ({ userId }: Props) => {
  const users = useUserStore((state) => state.users);
  const getUsers = useUserStore((state) => state.getUsers);
  useEffect(() => {
    getUsers("page", 1);
  }, []);
  const user = users?.find((user) => user._id === userId);
  return (
    <div className="flex items-center justify-between">
      <p className="font-thin text-sm overflow-hidden">{user?.name}</p>
      <img
        className="w-5 h-5 object-cover rounded-full m-1"
        src={user?.image?.[0] ? `${baseURL}${user.image[0]}` : avatar}
        alt="User"
      />
    </div>
  );
};

export default RenderUser;
