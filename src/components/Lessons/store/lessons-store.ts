import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Lesson } from '@/Types/LessonType'

interface LessonStore {
    lessons: [Lesson],
    lesson: Lesson,
    getLesson: (id: string) => Promise<void>,
    getLessons: (searchType: string, searchTerm: any) => void,

}
export const useLessonStore = create<LessonStore>()(
    devtools((set) => ({
        lessons: [],
        lesson: null,
    
        // ✅ Set current book
        getLesson: async (id: string)=> {
            try {
              const response = await fetch(`http://localhost:3000/lessons/${id}`,{
                method: "GET",
              });
    
              if (!response.ok) {
                throw new Error(`Failed to get book: ${response.statusText}`);
              }
    
              const lessonData = await response.json();
              set({lesson: lessonData.data.lesson });
            } catch (error) {
              console.error("Error getting lesson:", error);
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
        getLessons: async (searchType: any, searchTerm: any) => {
          try {
            let url = "http://localhost:3000/lessons";
    
            if (searchTerm) {
              url += `?${searchType}=${encodeURIComponent(searchTerm)}`;
            }
    
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (!response.ok) {
              throw new Error(`Failed to fetch books: ${response.statusText}`);
            }
    
            const data = await response.json();
            set({ lessons: data.data.lesson });
          } catch (error) {
            console.error("Error fetching books data:", error);
          }
        },
      }))
)