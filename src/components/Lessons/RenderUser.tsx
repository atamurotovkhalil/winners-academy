import { useUserStore } from "../Signup/store/user-store";
import { baseURL } from "@/lib/baseURL";
import avatar from "./../../assets/avatar6.png";

type Props = {
  userId: number | undefined;
  userName?: string;
};

const RenderUser = ({  userName }: Props) => {
  const { user } = useUserStore();
  return (
    <div className="flex items-center justify-between">
      <img
        className="w-5 h-5 object-cover rounded-full m-1"
        src={user?.attachPath ? `${baseURL}${user?.attachPath}` : avatar}
        alt="User"
      />
      <p className="font-thin text-sm">{userName}</p>
      
    </div>
  );
};

export default RenderUser;
