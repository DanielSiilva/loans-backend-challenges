import { Logger } from "@/helpers/logger";
import { Db, MongoClient } from "mongodb";

export class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient;
  private db?: Db;

  private constructor() {
    const uri = process.env.MONGO_URL || "";
    this.client = new MongoClient(uri);
  }

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(dbName = process.env.GLOBAL_DB): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(dbName);
      Logger.info(`Connected to MongoDB: ${dbName}`);
    }
    return this.db;
  }

  public getDB(): Db {
    if (!this.db) {
      throw new Error("MongoDB not connected. Call connect() first.");
    }
    return this.db;
  }
}
