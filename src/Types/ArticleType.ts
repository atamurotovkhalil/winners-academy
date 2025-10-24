

export interface Article {
    id: number;
    title: string;
    author: string;
    filePath: string;
    description?: string;
    attachPath?: string[] ;
    file: string[]; // Assuming the file is stored as an array of strings
    profileId: string; // Assuming the userId is a string (can be an ObjectId if you're using MongoDB ObjectIds)
    category: string | null;
    status: string; // If you want to restrict it to these two statuses
    views: number;
    likes: number;
    extension: string;
    createdDate: string; // ISO date string
    updatedAt: string; // ISO date string
}

