import { Role } from "@prisma/client";

interface User {
  id: number;
  role: Role;
  email: string;
  password: string;
  name: string;
  lastName: string;
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

interface Account {
  idUser: number;
  total: number;
}

export { AuthUser, LoginUser, TokenUser, User };
