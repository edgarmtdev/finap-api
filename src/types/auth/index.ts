import { Role } from "@prisma/client";

interface AuthResponse {
  success: boolean;
  user?: TokenUser;
  token?: string;
  message?: string | unknown;
}

interface AuthUser {
  role: Role;
  email: string;
  password: string;
  name: string;
  lastName: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface TokenUser {
  id: number;
  role: Role;
  email: string;
  name: string;
  lastName: string;
}

export { AuthResponse, AuthUser, LoginUser, TokenUser };
