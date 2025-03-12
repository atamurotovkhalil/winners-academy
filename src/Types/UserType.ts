export interface User {
  _id: string; // MongoDB ObjectID
  name: string;
  surname?: string; // Optional field
  type: string; // Enum type
  status: string; // Enum type
  level: string; // Level information
  phone?: string; // Optional field
  likedLessonId: string[]; // Array of strings for liked lessons
  address?: string; // Optional field
  image?: string; // Optional field for the image path
  email: string;
  detail: string;
  telegramLink?: any;
  instagramLink?: any;
  tiktokLink?: any;
  password: string;
  confirmpassword?: string; // Optional, needed only during registration
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  comparePassword: (pswd: string) => Promise<boolean>;
  isPasswordChanged: (JWTTimestamp: number) => Promise<boolean>;
  createResetPasswordToken: () => string;
};
