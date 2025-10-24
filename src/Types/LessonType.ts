export interface Lesson {
    id: number;
    title: string;
    description?: string;
    attachPath?: string[] ;
    extension?: string;
    author?: string;
    category?: string;
    status?: string;
    views: number;
    likes: number;
    profileId?: number;
    userId?: string;
    createdDate: string; // ISO date string
    updatedAt: string; // ISO date string
  }