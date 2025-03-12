import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Article } from '@/Types/ArticleType'


interface ArticleStore {
    articles: [Article],
    article: Article,
    getArticle: (id: string) => Promise<void>,
    getArticles: (searchType: string, searchTerm: any) => void,

}
export const useArticleStore = create<ArticleStore>()(
    devtools((set) => ({
        articles: [],
        article: null,
    
        // ✅ Set current book
        getArticle: async (id: string)=> {
            try {
              const response = await fetch(`http://localhost:3000/articles/${id}`,{
                method: "GET",
              });
    
              if (!response.ok) {
                throw new Error(`Failed to get book: ${response.statusText}`);
              }
    
              const lessonData = await response.json();
              set({article: lessonData.data.article });
            } catch (error) {
              console.error("Error getting book:", error);
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
        getArticles: async (searchType: any, searchTerm: any) => {
          try {
            let url = "http://localhost:3000/articles";
    
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
            set({ articles: data.data.article });
          } catch (error) {
            console.error("Error fetching books data:", error);
          }
        },
      }))
)