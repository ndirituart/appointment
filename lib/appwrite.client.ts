// Create a new file: lib/appwrite.client.ts
import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) 
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!); // Notice: NO API KEY here

export const account = new Account(client);