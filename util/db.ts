import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URI as string;

export async function connnectToDatabase(): Promise<MongoClient> {
  const client = await MongoClient.connect(url);
  return client;
}
