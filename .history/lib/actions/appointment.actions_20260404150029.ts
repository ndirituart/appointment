"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { Appointment } from "@/types/appwrite.types";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Resend } from 'resend';

// --- CREATE APPOINTMENT ---
export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

// --- GET RECENT APPOINTMENTS ---
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = { scheduledCount: 0, pendingCount: 0, cancelledCount: 0 };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") acc.scheduledCount++;
        else if (appointment.status === "pending") acc.pendingCount++;
        else if (appointment.status === "cancelled") acc.cancelledCount++;
        return acc;
      },
      initialCounts
    );

    // MAP THE DATA HERE
    const mappedDocuments = appointments.documents.map((doc) => ({
      ...doc,
     //I simply created "patient" as an object, fixed everything in all documents
      patient: (doc as Appointment).patientId, 
    }));

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: mappedDocuments, // Use the mapped documents instead
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while retrieving recent appointments:", error);
  }
};

// --- SEND EMAIL NOTIFICATION ---

//API Key
const resend = new Resend('re_dVijMf5p_Gp63DRiw22evYo3f9cqj7K7p');

export const sendEmailNotification = async (email: string, content: string) => {
  try {
    const data = await resend.emails.send({
      //Default Resend sender email address, you can change it in the Resend dashboard
      from: 'Amiani Healthcare <onboarding@resend.dev>', 
      to: email, 
      subject: 'Appointment Update - Amiani Healthcare',
      html: `<p>${content.replace(/\n/g, '<br>')}</p>`, // Convert newlines to HTML breaks
    });
    return parseStringify(data);
  } catch (error) {
    console.error("Resend Error:", error);
  }
};


// --- GET APPOINTMENT ---
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error("An error occurred while retrieving appointment:", error);
  }
};
