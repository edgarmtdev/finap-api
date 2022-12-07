import { Role } from "@prisma/client";

interface AuthUser {
  role: Role;
  email: string;
  name: string;
  lastName: string;
}

interface Account {
  idUser: number;
  total: number;
}


export default AuthUser;
