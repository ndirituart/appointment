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
re_KnEjfg2G_KXieN116byNgiku6ATW1MtKJ

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

// --- UPDATE APPOINTMENT ---
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw new Error("Appointment not found");

    // 1. Compose the email body FIRST so it's available below
    const emailContent = `
      Greetings from Amiani Healthcare.
      
      ${type === "schedule" 
        ? `Your appointment has been successfully confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}.` 
        : `We regret to inform you that your appointment scheduled for ${formatDateTime(appointment.schedule!, timeZone).dateTime} has been cancelled. 
           Reason: ${appointment.cancellationReason}`
      }
      
      Please contact us if you have any questions.
    `;

    // 2. Extract the email (using your new patientId mapping)
    // We cast as any here if TypeScript is still being grumpy about the mapping
    const recipientEmail = (updatedAppointment as any).patientId?.email;

    if (recipientEmail) {
      await sendEmailNotification(recipientEmail, emailContent);
    } else {
      // Fallback for testing if the patient doesn't have an email in the DB
      console.warn("No email found for this patient, trying fallback...");
      await sendEmailNotification('ndiritupatience002@gmail.com', emailContent);
    }

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating the appointment:", error);
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
