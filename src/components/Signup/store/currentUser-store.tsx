import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/Types/UserType";

interface CurrentUserStore {
  currentUser: User;
  fetchUserData: () => Promise<void>;
  resetCurrentUser: () => void;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useCurrentUserStore = create<CurrentUserStore>()(
  devtools((set) => ({
    currentUser: null,
    

    fetchUserData: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        } 
        ;

        const res = await fetch(`${BASE_URL}/profile/authentication`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch current user");

        const data = await res.json();
        set({ currentUser: data });
      } catch (error) {
      }
    },
  }))
);
