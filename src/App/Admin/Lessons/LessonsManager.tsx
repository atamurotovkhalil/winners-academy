import React, { useEffect, useState } from "react";
import { useLessonStore } from "@/components/Lessons/store/lessons-store";
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
import { usePopup } from "@/widgets/popup-store/popup-store";

interface FindLesson {
  title: string;
  author: string;
  category: string;
}

const LessonsManager = () => {
  const { lessons, getLessons } = useLessonStore();
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [lesson, setLesson] = useState<FindLesson>({
    title: "",
    author: "",
    category: "All",
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const setSignErroruppopup = usePopup((state: any) => state.setSignErroruppopup);
  const setLikespopup = usePopup((state: any) => state.setLikespopup);

  useEffect(() => {
    getLessons(lesson, page, size);
  }, [getLessons]);

  const searchLessons = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getLessons(lesson, page, size);
  };

  async function handleDeleteProduct(id: number) {
    const deleteLesson = window.confirm("Are you sure you want to delete this lesson?");
    if (deleteLesson) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setSignErroruppopup(true, "Please log in.");
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(`${BASE_URL}/lessons/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        getLessons(lesson, page, size);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || response.statusText);
        }
        setLikespopup();
      } catch (err: any) {
        setSignErroruppopup(true, `Failed to delete lesson: ${err.message || err}`);
      }
    }
  }

  return (
    <div className="container mx-auto px-3 sm:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Lessons Management</h2>

      {/* Search Section */}
      <div className="shadow-2xl rounded-md bg-white p-4 mb-6">
        <p className="text-lg font-semibold mb-3 italic text-gray-700">Search Lessons:</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:max-w-3xl">
          <input
            type="text"
            placeholder="Search by title"
            onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Search by author"
            onChange={(e) => setLesson({ ...lesson, author: e.target.value })}
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={searchLessons}
            className="flex items-center justify-center gap-2 border border-primary bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark transition-all"
          >
            <FaSearch />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Lessons Table */}
      <div className="overflow-x-auto shadow-lg rounded-md">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Image</th>
              <th className="border px-3 py-2">Title</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Author</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons?.map((lesson) => (
              <tr key={lesson.id} className="text-center hover:bg-gray-50 transition-all">
                <td className="border px-3 py-2">{lesson.id}</td>
                <td className="border px-3 py-2">
                  <img
                    src={`${baseURL}${lesson?.attachPath}`}
                    alt={lesson?.title}
                    className="w-12 h-12 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border px-3 py-2">{lesson?.title}</td>
                <td className="border px-3 py-2">{lesson?.category}</td>
                <td className="border px-3 py-2">{lesson?.author}</td>
                <td
                  className={`border px-3 py-2 font-semibold ${
                    lesson?.status === "ACTIVE" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {!lesson?.status? `No status`: lesson?.status}
                </td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => handleDeleteProduct(lesson.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm sm:text-base hover:bg-red-600 transition-all"
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
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                    getLessons(lesson, page - 1, size);
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
                  getLessons(lesson, page + 1, size);
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

export default LessonsManager;
