import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/Types/UserType";

interface ArticleStore {
  users: [User];
  user: User;
  currentUser: User;
  getUser: (id: any) => Promise<void>;
  getUsers: (searchType: string, searchTerm: any) => void;
  fetchUserData: () => void;
  setUser: (user: User)=>void
}
export const useUserStore = create<ArticleStore>()(
  devtools((set) => ({
    users: [],
    user: null,
    currentUser: null,
    setUser: (user: User) => set({ currentUser: user }),
    // ✅ Set current book
    getUser: async (id: string) => {
      if (!id) return;

      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token"); // Adjust the key if needed

        // Make sure the token exists
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        // Send the GET request with the token in the Authorization header
        const response = await fetch(
          `http://localhost:3000/auth/signup/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
              "Content-Type": "application/json", // Optional, to specify JSON content
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to get user: ${response.statusText}`);
        }

        const data = await response.json();
        set({ user: data.data.user });
      } catch (error) {
        console.error("Error getting user:", error);
      }
    },

    fetchUserData: async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            "http://localhost:3000/users/getCurrentUser",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            set({ currentUser: data.data.user }); // Update user in the store
          } else {
            console.error("Failed to fetch user data:", response.statusText);
          }
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    // ✅ Remove a book from the store
    // removeBook: async (id: string) => {
    //   try {
    //     const response = await fetch(`https://new-backend-bu96.onrender.com/api/books/${id}`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error(`Failed to remove book: ${response.statusText}`);
    //     }
    //   } catch (error) {
    //     console.error("Error removing book:", error);
    //   }
    // },
    // ✅ Fetch all books from the API
    getUsers: async (searchType: any, searchTerm: any) => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          let url = "http://localhost:3000/users";

          if (searchTerm) {
            url += `?${searchType}=${encodeURIComponent(searchTerm)}`;
          }

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.statusText}`);
          }

          const data = await response.json();
          set({ users: data.data.users });
        }
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    },
  }))
);
