import { Role } from "@prisma/client";

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

interface Account {
  idUser: number;
  total: number;
}

export { AuthUser, LoginUser };
