"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://cloud.appwrite.io/console/project-nyc-6995765200254278a3e7/databases/database-6995768c000238156062/table-patients
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } // Inside patient.actions.ts -> createUser
  catch (error: any) {
    if (error && error?.code === 409) {
      // If the user exists, try to fetch them by email specifically
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      console.log("Found Existing User:", existingUser.users[0]); // CHECK YOUR TERMINAL
      return existingUser.users[0];
    }
    console.error("Critical Auth Error:", error);

  };
}
// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    // user exists, this works perfectly
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    // CRITICAL: Return null so the calling component knows the user fetch failed
    return null; 
  }
};


// REGISTER PATIENT
// lib/actions/patient.actions.ts

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  // Debug: Log consent values if they exist
  if ('treatmentConsent' in patient) console.log("RECEIVED ON SERVER:", patient.treatmentConsent);
  if ('disclosureConsent' in patient) console.log("RECEIVED ON SERVER:", patient.disclosureConsent);
  if ('privacyConsent' in patient) console.log("RECEIVED ON SERVER:", patient.privacyConsent);
  

  try {
    let file;

    // 1. Upload the file if it exists
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // 2. Create the document with EXACT attribute mapping
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patient,
        // Convert Date to String
        birthDate: new Date(patient.birthDate).toISOString(),
        
        // FIX: Match 'identityType' 
        identificationType: patient.identificationType, 
        
        // FIX: Match 'identificationDocumentId' and handle null case
        identificationDocumentId: file?.$id || null, 
        
        // FIX: Construct the URL manually
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
      }
    );

    return parseStringify(newPatient);
  }  catch (error: any) {
   
    console.log("FULL ERROR JSON:", JSON.stringify(error.response, null, 2));
    console.error("APPWRITE ERROR:", error.message);
}
};


//get the patient details
export const getPatient = async (userId: string) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)] 
    );

    // If result.total is 0, this returns undefined, which breaks the form
    return result.documents[0]; 
  } catch (error) {
    console.error("Database query failed:", error);
    return null;
  }
}