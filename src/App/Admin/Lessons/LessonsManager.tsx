import React, { useEffect, useState } from "react";
import { useLessonStore } from "@/components/Lessons/store/lessons-store";
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

const LessonsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { lessons } = useLessonStore();
  const { getLessons } = useLessonStore();
  const [page, setPage] = useState(1);
  //const { fetchProducts } = useProductStore.getState();

  useEffect(() => {
    getLessons("page", 1); // Fetch products on component mount
  }, [getLessons]);

  const searchLessons = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getLessons("keyword", searchTerm);
  };
  function forwardPage() {
    getLessons("keyword", searchTerm);
    console.log(searchTerm);
    if (page > 0 && 0 <= lessons.length) {
      setPage(page + 1);
      getLessons("page", page + 1);
    }
  }
  function prevPage() {
    getLessons("keyword", searchTerm);
    console.log(searchTerm);
    if (page >= 1 && 0 <= lessons.length) {
      setPage(page - 1);
      getLessons("page", page - 1);
    }
  }

  async function handleDeleteProduct(id: string) {
    const deleteLesson = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (deleteLesson === true) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(`http://localhost:3000/lessons/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        getLessons("page", 1);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to delete product: ${
              errorData.message || response.statusText
            }`
          );
        }

        console.log(`Product with ID ${id} was successfully deleted.`);
      } catch (err: any) {
        console.error("Failed to delete product:", err.message || err);
      }
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Products Management</h2>
      <div className="col-span-1 shadow-2xl h-[100px] m-3 p-3">
        <p className="text-xl m-2 italic">Searching:</p>
        <div className="w-[200px] flex">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" border border-black rounded-md"
          ></input>
          <button
            onClick={searchLessons}
            className="border border-primary rounded-md bg-primary text-white text-sm hover:bg-primary-dark duration-75"
          >
            <FaSearch className="text-sm bg-primary text-white  m-2" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons?.map((lesson) => (
              <tr key={lesson._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {lesson._id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={`${baseURL}${lesson?.file?.[0]}`}
                    alt={lesson?.title}
                    className="w-12 h-12 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {lesson?.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {lesson?.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {lesson?.author}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    lesson?.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {lesson?.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDeleteProduct(lesson._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button disabled={page === 1}>
              <PaginationPrevious onClick={() => prevPage()} />
            </button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <button 
            disabled={lessons?.length < 1}>
              <PaginationNext onClick={() => forwardPage()} />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default LessonsManager;
