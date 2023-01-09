import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function initializeDB() {
  return Promise.all([
    client.user.deleteMany(),
    client.account.deleteMany(),
    client.transactions.deleteMany(),
  ]);
}
