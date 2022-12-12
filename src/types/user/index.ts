import { Role } from "@prisma/client";

interface User {
  id: number;
  role: Role;
  email: string;
  password: string;
  name: string;
  lastName: string;
}

interface Account {
  idUser: number;
  total: number;
}

export { User, Account };
