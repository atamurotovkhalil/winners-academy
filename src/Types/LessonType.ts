export interface Lesson {
    _id: string;
    title: string;
    description?: string;
    file?: string[];
    author?: string;
    category?: string;
    status?: string;
    views: number;
    likes: number;
    userId?: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  }