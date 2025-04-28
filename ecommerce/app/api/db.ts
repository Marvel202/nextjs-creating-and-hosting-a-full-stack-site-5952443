import { Db, MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb : Db | null = null;

export async function connectToDb() {

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb};
  }  
  /*
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.yll1bfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
*/

  const uri ='mongodb+srv://rwtkoon:mnIRcxXQgnc40nSR@cluster0.yll1bfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
    await client.connect();

    cachedClient = client;
    cachedDb = client.db('Nextjs-ecommerce-site');

    return { client, db: client.db('Nextjs-ecommerce-site')}
}