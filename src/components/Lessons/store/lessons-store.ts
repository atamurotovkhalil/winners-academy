import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Lesson } from '@/Types/LessonType'

type CommentType = {
  id: string;
  articleId?: number;
  lessonId: number;
  profileId: number;
  profileName?: string;
  commentBody: string;
  createdDate: string;
};
interface FindLesson {
  title: string;
  author: string;
  category: string | null;
}


interface LessonStore {
  
  lessons: [Lesson],
  lesson: Lesson,
  articleComments: CommentType[],
  lessonComments: CommentType[],
  userLessons: Lesson[],
  fetchLessonComments: (id: string | undefined) => Promise<void>,
  fetchArticleComments: (id: string | undefined) => Promise<void>,
  getLesson: (id: string | undefined) => Promise<void>,
  getLessons: (lesson: FindLesson, page: number, size: number) => void,
  getUserLessons: (id: string | undefined, page: number, size: number) => void,

}
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useLessonStore = create<LessonStore>()(
  devtools((set) => ({
    lessons: [],
    allComments: [],
    userLessons: [],
    lesson: null,
    articleComments: [],
    lessonComments: [],

    // ✅ Set current Lesson
    getLesson: async (id: string | undefined) => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${BASE_URL}/lessons/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to get book: ${response.statusText}`);
        }

        const lessonData = await response.json();
        set({ lesson: lessonData });
      } catch (error) {
      }

    },
    getLessons: async (Lesson: FindLesson, page: number, size: number) => {
      try {
        let url = `${BASE_URL}/lessons/all`;

        if (page && size) {
          url += `?page=${page}&size=${size}`;
          ;
        }
        if (Lesson.category === "All") {
          Lesson.category = null;
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: Lesson.title,
            author: Lesson.author,
            category: Lesson.category,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.statusText}`);
        }

        const data = await response.json();
        set({ lessons: data.content });

      } catch (error) {
      }
    },
    getUserLessons: async (userId: string | undefined, page: number, size: number) => {
      const token = localStorage.getItem("token");
      try {
        let url = `${BASE_URL}/lessons/user-lessons/${userId}`;
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
          throw new Error(`Failed to fetch lessons: ${response.statusText}`);
        }

        const data = await response.json();
        set({ userLessons: data.content });

      } catch (error) {
      }
    },
    fetchLessonComments: async (id: number | undefined) => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${BASE_URL}/comments/lesson/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to get comments: ${response.statusText}`);
        }

        const data = await response.json();
        set({ lessonComments: data })
      } catch (error) {
      }
    },
    fetchArticleComments: async (id: number | undefined) => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${BASE_URL}/comments/article/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to get comments: ${response.statusText}`);
        }

        const data = await response.json();
        set({ articleComments: data })
      } catch (error) {
      }
    }
  }))
)