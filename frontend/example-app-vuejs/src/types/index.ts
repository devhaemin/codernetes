export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Board {
  id: string;
  title: string;
  content: string;
  authorUsername: string;
  viewCount: number;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
} 