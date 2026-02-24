// Create a new file: lib/appwrite.client.ts
import { Client, Account } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!); // NO API KEY HERE

export const account = new Account(client);