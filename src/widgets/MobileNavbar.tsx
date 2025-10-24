import { useEffect } from "react";
import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";



const MobileNavbar = ( ) => {
  const { fetchUserData, currentUser } = useCurrentUserStore();

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [currentUser, fetchUserData]);
  return <div></div>;
};

export default MobileNavbar;
