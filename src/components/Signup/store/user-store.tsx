import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/Types/UserType";

interface FindUser {
  name: string;
  phone: string;
}

interface UserStore {
  users: User[],
  user: User;
  getUser: (id: string | undefined | number) => Promise<void>;
  getUsers: (user: FindUser, page: number, size: number) => Promise<void>;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    user: null,
    users: null,

    getUser: async (id) => {
      if (!id) return;

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const response = await fetch(`${BASE_URL}/profile/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to get user");

        const data = await response.json();
        set({ user: data });
      } catch (error) {
      }
    },
    getUsers: async (user: FindUser, page: number, size: number) => {
      try {
        let url = `${BASE_URL}/profile/all`;
        const token = localStorage.getItem("token");
        if (!token) return;
        if (page && size) {
          url += `?page=${page}&size=${size}`;
          ;
        }
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: user.name,
            phone: user.phone
          }),
        });
        if (!response.ok) throw new Error("Failed to get users");

        const data = await response.json();
        set({ users: data.content });
      } catch (error) {
      }
    },
  }))
);
