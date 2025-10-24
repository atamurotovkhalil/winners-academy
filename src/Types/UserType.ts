import { Article } from "./ArticleType";
import { Lesson } from "./LessonType";

export interface User {
  imagePath: string | undefined;
  id: string | number; // MongoDB ObjectID
  name: string;
  surname?: string; // Optional field
  type: string; // Enum type
  status: string; // Enum type
  level: string; // Level information
  phone?: string; // Optional field
  likedLessons: Lesson[]; // Array of strings for liked lessons
  likedArticles: Article[];
  address?: string; // Optional field
  profileRole?: string;
  image?: string; // Optional field for the image path
  email: string;
  attachPath: string;
  detail: string;
  attach: {
    id: string;
    path: string;
    extension: string;
    createdDate: Date;
  }
  password: string;
  confirmpassword?: string; // Optional, needed only during registration
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  comparePassword: (pswd: string) => Promise<boolean>;
  isPasswordChanged: (JWTTimestamp: number) => Promise<boolean>;
  createResetPasswordToken: () => string;
};
