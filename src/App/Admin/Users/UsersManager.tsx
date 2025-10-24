import { useEffect, useState } from "react";
import { useUserStore } from "@/components/Signup/store/user-store";
import { FaSearch } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { baseURL } from "@/lib/baseURL";
import { User } from "@/Types/UserType";
import avatar from "./../../../assets/avatar6.png";
import { useCurrentUserStore } from "@/components/Signup/store/currentUser-store";
import { usePopup } from "@/widgets/popup-store/popup-store";

interface FindUser {
  name: string;
  phone: string;
  level: string | null;
}

const UsersManager = () => {
  const { users, getUsers } = useUserStore();
  const {  fetchUserData } = useCurrentUserStore();
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [allUsers, setAllUsers] = useState<FindUser>({
    name: "",
    phone: "",
    level: "All",
  });
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const setLikespopup = usePopup((state: any) => state.setLikespopup);

  useEffect(() => {
    getUsers(allUsers, page, size);
    fetchUserData();
  }, [getUsers, fetchUserData]);

  const searchUsers = () => {
    getUsers(allUsers, page, size);
  };
  //handle activate user
  async function handleActivate(user: User) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setSignErroruppopup(true, "Please log in.");
        throw new Error("No token found. Please log in.");
      }
      if (user?.status === "ACTIVE") {
        const blockUser = window.confirm(
          "Are you sure you want to do inactive this user?"
        );
        if (blockUser === true) {
          const response = await fetch(
            `${BASE_URL}/profile/${user?.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "INACTIVE" }),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            setSignErroruppopup(
              true,
              `Failed to activate member: ${
                errorData.message || response.statusText
              }`
            );
            throw new Error(
              `Failed to activate member: ${
                errorData.message || response.statusText
              }`
            );
          }
        }
      } else if (user.status === "INACTIVE") {
        const activeUser = window.confirm(
          "Are you sure you want to activate this user?"
        );
        if (activeUser === true) {
          const response = await fetch(
            `${BASE_URL}/profile/${user.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "ACTIVE" }),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            setSignErroruppopup(
              true,
              `Failed to activate member: ${
                errorData.message || response.statusText
              }`
            );
            throw new Error(
              `Failed to activate member: ${
                errorData.message || response.statusText
              }`
            );
          }
        }
      }
      getUsers(allUsers, page, size);
      setLikespopup();
    } catch (err: any) {
      setSignErroruppopup(
        true,
        "Failed to activate member:",
        err.message || err
      );
    }
  }

  // delete member
  async function switchToUser(member: User) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setSignErroruppopup(true, "Please log in.");
        throw new Error("No token found. Please log in.");
      }
      if (member?.profileRole !== "ROLE_ADMIN") {
        const usertype = window.confirm(
          "Are you sure you want to switch this teacher to user?"
        );
        if (usertype === true) {
          const response = await fetch(
            `${BASE_URL}/profile/switch/${member?.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ profileRole: "ROLE_USER" }),
            }
          );
          if (response.ok) setLikespopup();
          if (!response.ok) {
            const errorData = await response.json();
            setSignErroruppopup(
              true,
              `Failed to switch to USER: ${
                errorData.message || response.statusText
              }`
            );
            throw new Error(
              setSignErroruppopup(
                true,
                `Failed to switch to USER: ${
                  errorData.message || response.statusText
                }`
              )`Failed to switch to USER: ${
                errorData.message || response.statusText
              }`
            );
          }
        }
      }
      getUsers(allUsers, page, size);

      setLikespopup();
    } catch (err: any) {
      setSignErroruppopup(
        true,
        "Failed to activate member:",
        err.message || err
      );
    }
  }
  async function switchToTeacher(user: User) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setSignErroruppopup(true, "Please log in.");
        throw new Error("No token found. Please log in.");
      }
      if (user?.profileRole !== "ROLE_ADMIN") {
        const usertype = window.confirm(
          "Are you sure you want to switch this user to teacher?"
        );
        if (usertype === true) {
          const response = await fetch(
            `${BASE_URL}/profile/switch/${user?.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ profileRole: "ROLE_TEACHER" }),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            setSignErroruppopup(
              true,
              `Failed to switch to Teacher: ${
                errorData.message || response.statusText
              }`
            );
            throw new Error(
              `Failed to switch to Teacher: ${
                errorData.message || response.statusText
              }`
            );
          }
        }
      }
      getUsers(allUsers, page, size);
      setLikespopup();
    } catch (err: any) {
      setSignErroruppopup(
        true,
        "Failed to activate member:",
        err.message || err
      );
    }
  }

  // delete member
  async function deleteMember(id: string | number) {
    const deleteUser = window.confirm(
      `Are you sure you want to delete member with id ${id}?`
    );
    if (deleteUser === true) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setSignErroruppopup(true, "Please log in.");
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(`${BASE_URL}/profile/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        getUsers(allUsers, page, size);

        if (!response.ok) {
          const errorData = await response.json();
          setSignErroruppopup(
            true,
            `Failed to delete member: ${
              errorData.message || response.statusText
            }`
          );
          throw new Error(
            `Failed to delete member: ${
              errorData.message || response.statusText
            }`
          );
        }
        setLikespopup();
      } catch (err: any) {
        setSignErroruppopup(true, "Failed to delete user:", err.message || err);
      }
    }
  }

  return (
    <div className="mx-auto p-4 max-w-7xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Members Management
      </h2>

      {/* SEARCH BOX */}
      <div className="shadow-2xl h-auto m-3 p-3 rounded-md">
        <p className="text-xl mb-2 italic">Searching:</p>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full">
          <input
            type="text"
            onChange={(e) => setAllUsers({ ...allUsers, name: e.target.value })}
            className="border border-black rounded-md w-full px-2 py-2"
            placeholder="Search by name"
          />
          <input
            type="text"
            onChange={(e) =>
              setAllUsers({ ...allUsers, phone: e.target.value })
            }
            className="border border-black rounded-md w-full px-2 py-2"
            placeholder="Search by phone"
          />
          <button
            onClick={searchUsers}
            className="border border-primary bg-primary text-white rounded-md hover:bg-primary-dark p-2 flex items-center justify-center"
          >
            <FaSearch className="text-sm" />
          </button>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="overflow-x-auto hidden md:block">
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
              <tr key={member.id} className="text-center text-sm sm:text-base">
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={
                      member?.attachPath
                        ? `${baseURL}${member.attachPath}`
                        : avatar
                    }
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{member.phone}</td>
                <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                  <button
                    disabled={member.profileRole === "ROLE_TEACHER"}
                    onClick={() => switchToTeacher(member)}
                    className={`px-3 py-1 rounded-md text-white ${
                      member.profileRole === "ROLE_USER"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400"
                    }`}
                  >
                    USER
                  </button>
                  <button
                    disabled={member.profileRole === "ROLE_USER"}
                    onClick={() => switchToUser(member)}
                    className={`px-3 py-1 rounded-md text-white ${
                      member.profileRole === "ROLE_TEACHER"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400"
                    }`}
                  >
                    TEACHER
                  </button>
                </td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    member.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {member.status}
                </td>
                <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handleActivate(member)}
                    className={`px-3 py-1 rounded-md text-white ${
                      member.status === "INACTIVE"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {member.status === "INACTIVE" ? "ACTIVATE" : "INACTIVATE"}
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
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

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {users?.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg p-3 shadow-md flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  member?.attachPath ? `${baseURL}${member.attachPath}` : avatar
                }
                alt="Profile"
                className="w-14 h-14 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-600">{member.phone}</p>
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <span
                className={`text-sm font-semibold ${
                  member.status === "ACTIVE" ? "text-green-600" : "text-red-600"
                }`}
              >
                {member.status}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                {member.profileRole?.replace("ROLE_", "")}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <button
                onClick={() => handleActivate(member)}
                className={`px-3 py-1 rounded-md text-white ${
                  member.status === "INACTIVE"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {member.status === "INACTIVE" ? "ACTIVATE" : "INACTIVATE"}
              </button>
              <button
                disabled={member.profileRole === "ROLE_TEACHER"}
                onClick={() => switchToTeacher(member)}
                className={`px-3 py-1 rounded-md text-white ${
                  member.profileRole === "ROLE_USER"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400"
                }`}
              >
                USER
              </button>
              <button
                disabled={member.profileRole === "ROLE_USER"}
                onClick={() => switchToUser(member)}
                className={`px-3 py-1 rounded-md text-white ${
                  member.profileRole === "ROLE_TEACHER"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400"
                }`}
              >
                TEACHER
              </button>
              <button
                onClick={() => deleteMember(member.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="my-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                    getUsers(allUsers, page - 1, size);
                  }
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                href="#"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setPage(page + 1);
                  getUsers(allUsers, page + 1, size);
                }}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default UsersManager;
