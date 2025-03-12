import React, { useEffect, useState } from "react";
import { useUserStore } from "@/components/Signup/store/user-store";
import { FaSearch } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { baseURL } from "@/lib/baseURL";
import { User } from "@/Types/UserType";
import avatar from "./../../../assets/avatar6.png";

const UsersManager = () => {
  const { users, user, fetchUserData, getUsers } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  console.log(users);

  useEffect(() => {
    getUsers("page", 1);
    fetchUserData();
  }, [getUsers, fetchUserData]);

  const searchUsers = () => {
    getUsers("keyword", searchTerm);
  };
  function forwardPage() {
    getUsers("keyword", searchTerm);
    if (page > 0 && 0 <= users.length) {
      setPage(page + 1);
      getUsers("page", page + 1);
    }
  }
  function prevPage() {
    getUsers("keyword", searchTerm);
    if (page >= 1 && 0 <= users.length) {
      setPage(page - 1);
      getUsers("page", page - 1);
      console.log(users);
    }
  }
  console.log(users);
  //handle activate user
  async function handleActivate(user: User) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      if (user?.status === "ACTIVE_USER") {
        const blockUser = window.confirm(
          "Are you sure you want to block this user?"
        );
        if (blockUser === true) {
          const response = await fetch(
            `http://localhost:3000/users/${user?._id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "BLOCKED_USER" }),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to activate member: ${
                errorData.message || response.statusText
              }`
            );
          }
        }
      } else if (user.status === "BLOCKED_USER") {
        const activeUser = window.confirm(
          "Are you sure you want to activate this user?"
        );
        if (activeUser === true) {
          const response = await fetch(
            `http://localhost:3000/users/${user._id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "ACTIVE_USER" }),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to activate member: ${
                errorData.message || response.statusText
              }`
            );
          }
        }
      }
      getUsers("page", 1);

      console.log(`Member with ID ${user._id} was successfully activated.`);
    } catch (err: any) {
      console.error("Failed to activate member:", err.message || err);
    }
  }

  // delete member
  async function switchToUser(id: string) {
    const swith = window.confirm(
      `Are you sure you want to swtich this teacher to user with id ${id}?`
    );
    if (swith === true) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "USER" }),
        });
        getUsers("page", 1);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to switch member: ${
              errorData.message || response.statusText
            }`
          );
        }

        console.log(`Member with ID ${id} was successfully switched.`);
      } catch (err: any) {
        console.error("Failed to switch user:", err.message || err);
      }
    }
  }
  async function switchToTeacher(user: User) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      if (user?.type === "USER") {
        const usertype = window.confirm(
          "Are you sure you want to switch this user to teacher?"
        );
        if (usertype === true) {
          const response = await fetch(
            `http://localhost:3000/users/${user?._id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ type: "TEACHER" }),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to switch to Teacher: ${
                errorData.message || response.statusText
              }`
            );
          }
        }
      }
      getUsers("page", 1);

      console.log(`Member with ID ${user._id} was successfully activated.`);
    } catch (err: any) {
      console.error("Failed to activate member:", err.message || err);
    }
  }

  // delete member
  async function deleteMember(id: string) {
    const deleteUser = window.confirm(
      `Are you sure you want to delete member with id ${id}?`
    );
    if (deleteUser === true) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        getUsers("page", 1);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to delete member: ${
              errorData.message || response.statusText
            }`
          );
        }

        console.log(`Member with ID ${id} was successfully deleted.`);
      } catch (err: any) {
        console.error("Failed to delete user:", err.message || err);
      }
    }
  }

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Members Management
      </h2>

      {/* Search Section */}
      <div className="shadow-2xl h-auto m-3 p-3 rounded-md">
        <p className="text-xl mb-2 italic">Searching:</p>
        <div className="flex items-center w-full max-w-xs sm:max-w-md">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-black rounded-md w-full px-2 py-1"
            placeholder="Search members..."
          />
          <button
            onClick={searchUsers}
            className="border border-primary bg-primary text-white rounded-md hover:bg-primary-dark p-2 ml-2"
          >
            <FaSearch className="text-sm" />
          </button>
        </div>
      </div>

      {/* Table Section - Responsive */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-sm sm:text-base">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Switch Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((member) => (
              <tr key={member._id} className="text-center text-sm sm:text-base">
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={
                      member?.image?.[0]
                        ? `${baseURL}${member.image[0]}`
                        : avatar
                    }
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{member.email}</td>

                {/* Role Switching Buttons */}
                <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                  <button
                    disabled={member.name === "WEBSITE_ADMIN"}
                    onClick={() => switchToTeacher(member)}
                    className={`px-3 py-1 rounded-md text-white ${
                      member.type === "USER"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    USER
                  </button>
                  <button
                    disabled={member.name === "WEBSITE_ADMIN"}
                    onClick={() => switchToUser(member._id)}
                    className={`px-3 py-1 rounded-md text-white ${
                      member.type === "TEACHER"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    TEACHER
                  </button>
                </td>

                {/* Status */}
                <td
                  className={`border px-4 py-2 font-semibold ${
                    member.status === "ACTIVE_USER"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {member.status}
                </td>

                {/* Actions */}
                <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                  <button
                    disabled={member.name === "WEBSITE_ADMIN"}
                    onClick={() => handleActivate(member)}
                    className={`px-3 py-1 rounded-md text-white ${
                      member.status === "BLOCKED_USER"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {member.status === "BLOCKED_USER" ? "ACTIVATE" : "BLOCK"}
                  </button>
                  <button
                    disabled={member.name === "WEBSITE_ADMIN"}
                    onClick={() => deleteMember(member._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={prevPage}
          className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
        >
          <PaginationPrevious />
        </button>
        <span className="text-lg">{page}</span>
        <button
          disabled={users?.length < 1}
          onClick={forwardPage}
          className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
        >
          <PaginationNext />
        </button>
      </div>
    </div>
  );
};

export default UsersManager;
