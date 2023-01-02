import client from "../../libs/prisma/";

export async function initializeDB() {
  return Promise.all([
    client.user.deleteMany(),
    client.account.deleteMany(),
    client.transactions.deleteMany(),
  ]);
}
