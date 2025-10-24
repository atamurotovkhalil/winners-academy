import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Article } from "@/Types/ArticleType";

interface FindArticle {
  title: string;
  author: string;
  category: string;
}

interface ArticleStore {
  articles: [Article];
  article: Article;
  setSignErroruppopup: any;
  userArticles: [Article];
  getUserArticles: (id: number | string, page: number, size: number) => void;
  getArticle: (id: string | undefined) => Promise<void>;
  getArticles: (articles: FindArticle, page: number, size: number) => void;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const useArticleStore = create<ArticleStore>()(
  devtools((set) => ({
    articles: [],
    article: null,
    

    // ✅ Set current book
    getArticle: async (id: number) => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        return;
        // setSignErroruppopup(
        //   true,
        //   "Please login or signup first to see article in detail"
        // );
      }
      try {
        const response = await fetch(`${BASE_URL}/articles/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // setSignErroruppopup(
          //   true,
          //   `Failed to get article: ${response.statusText}`
          // );
          throw new Error(`Failed to get article: ${response.statusText}`);
        }

        const lessonData = await response.json();
        set({ article: lessonData });
      } catch (error) {
        //setSignErroruppopup(true, "Error getting article:", error);
      }
    },
    getArticles: async (article: FindArticle, page: number, size: number) => {
      try {
        let url = `${BASE_URL}/articles/all`;

        if (page && size) {
          url += `?page=${page}&size=${size}`;
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: article.title,
            author: article.author,
            category: article.category,
          }),
        });

        if (!response.ok) {
          // setSignErroruppopup(
          //   true,
          //   `Failed to fetch articles: ${response.statusText}`
          // );
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = await response.json();
        set({ articles: data.content });
      } catch (error) {
        //setSignErroruppopup(true, `Error fetching articles data: ${error}`);
      }
    },
    getUserArticles: async (
      userId: string | undefined,
      page: number,
      size: number
    ) => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        // setSignErroruppopup(
        //   true,
        //   "Please login or signup first to see article in detail"
        // );
      }
      try {
        let url = `${BASE_URL}/articles/user-articles/${userId}`;
        if (page && size) {
          url += `?page=${page}&size=${size}`;
        }
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          // setSignErroruppopup(
          //   true,
          //   `Failed to fetch articles: ${response.statusText}`
          // );
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = await response.json();
        set({ userArticles: data.content });
      } catch (error) {
        //setSignErroruppopup(true, `Error fetching books data: ${error}`);
      }
    },
  }))
);
