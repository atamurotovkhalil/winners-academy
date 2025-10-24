import React, { useEffect } from "react";
import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNavbar = (props: Props) => {
  const { fetchUserData, currentUser } = useCurrentUserStore();

  useEffect(() => {
    if (!currentUser) {
      fetchUserData();
    }
  }, [currentUser, fetchUserData]);
  return <div></div>;
};

export default MobileNavbar;
