import { PrismaClient } from "@prisma/client";

class Account {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
      this.client = client;
    }
}

export default Account;