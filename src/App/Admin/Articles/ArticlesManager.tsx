import React, { useEffect, useState } from "react";
import { useArticleStore } from "@/components/Community/store/article-stroe";
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


interface FindArticle {
  title: string;
  author: string;
  category: string;
}

const ArticlesManager = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { articles, getArticles } = useArticleStore();
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [article, setArticle] = useState<FindArticle>({
    title: "",
    author: "",
    category: "FREE_SHARING",
  });

  const setSignErroruppopup = usePopup((state: any) => state.setSignErroruppopup);

  useEffect(() => {
    getArticles(article, page, size);
  }, [getArticles, article, page, size]);

  const searchArticles = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getArticles(article, page, size);
  };

  async function handleDeleteProduct(id: number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSignErroruppopup(true, "Please log in.");
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setSignErroruppopup(
          true,
          `Failed to delete article: ${errorData.message || response.statusText}`
        );
        return;
      }

      getArticles(article, page, size);
    } catch (err: any) {
      setSignErroruppopup(true, `Failed to delete article: ${err.message || err}`);
    }
  }

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center md:text-left">
        Articles Management
      </h2>

      {/* Search Section */}
      <div className="shadow-2xl p-3 sm:p-4 mb-6 rounded-lg">
        <p className="text-lg sm:text-xl mb-3 italic">Search Articles</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 items-center">
          <input
            type="text"
            placeholder="Search by title"
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            className="border border-gray-400 rounded-md p-2 w-full sm:w-auto flex-1"
          />
          <input
            type="text"
            placeholder="Search by author"
            onChange={(e) => setArticle({ ...article, author: e.target.value })}
            className="border border-gray-400 rounded-md p-2 w-full sm:w-auto flex-1"
          />
          <select
            id="category"
            value={article.category}
            onChange={(e) => setArticle({ ...article, category: e.target.value })}
            className="p-2 border border-gray-400 rounded-md bg-white w-full sm:w-[180px]"
          >
            <option value="FREE_SHARING">FREE_SHARING</option>
            <option value="CLASS_BASED">CLASS_BASED</option>
            <option value="NEWS">NEWS</option>
          </select>
          <button
            onClick={searchArticles}
            className="flex items-center justify-center border border-primary bg-primary text-white rounded-md hover:bg-primary-dark duration-75 w-full sm:w-auto px-4 py-2 text-sm"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-2 sm:px-4 py-2">ID</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Image</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Title</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Category</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Author</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Status</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article) => (
              <tr key={article.id} className="text-center hover:bg-gray-50">
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {article.id}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  <img
                    src={`${baseURL}${article?.attachPath}`}
                    alt={article?.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2 truncate max-w-[150px] sm:max-w-[250px]">
                  {article?.title}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {article?.category}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {article?.author}
                </td>
                <td
                  className={`border border-gray-300 px-2 sm:px-4 py-2 font-semibold ${
                    article?.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {article?.status}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  <button
                    onClick={() => handleDeleteProduct(article.id)}
                    className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-red-600 text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="my-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                    getArticles(article, page - 1, size);
                  }
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                href="#"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="disabled">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setPage(page + 1);
                  getArticles(article, page + 1, size);
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

export default ArticlesManager;
