

export interface Article {
    _id: string;
    title: string;
    author: string;
    description?: string;
    file: string[]; // Assuming the file is stored as an array of strings
    userId: string; // Assuming the userId is a string (can be an ObjectId if you're using MongoDB ObjectIds)
    category: string;
    status: string; // If you want to restrict it to these two statuses
    views: number;
    likes: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

