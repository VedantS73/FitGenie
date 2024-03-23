import { Client, Account, Databases } from "appwrite";

const client = new Client();

const appwrite_api_key = '65fdbf643f997e6ea8f1';
const database_key = 'f7c948c8f7025238d93befa9906d1dde8028ba2e0e8fb44c87a50e531544da482b4d9469dbb5b7518dc98fd20a79698d9e70e05411af14c7c19e12273ea64f83f797f694a5391e4ae7c3cabf6663b63f1482d582ea81434900b171fad04c8e5d86948c460dc7a9d81c1dddf5433d8ef0a4494a4bb111e48d9ae0ac509d9419f8';

// Set the endpoint URL and project ID for the client
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(appwrite_api_key);

// Create a new account instance using the client
export const account = new Account(client);

// Create a new databases instance using the client and database ID
export const databases = new Databases(client, database_key);
