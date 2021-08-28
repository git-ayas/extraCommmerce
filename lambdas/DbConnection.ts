import { Db, MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME;
const DB_USER = process.env.MONGO_USER;
const DB_PASSWD = process.env.MONGO_PASS;

let cachedDb = null;
const defaultMongoUri = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${MONGO_URI}?retryWrites=true&w=majority`
export const connectToDatabase = async (uri,dbName=DB_NAME):Promise<Db> => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri);

  cachedDb = client.db(dbName);

  return cachedDb;
};

export default connectToDatabase(defaultMongoUri)