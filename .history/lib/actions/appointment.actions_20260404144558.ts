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

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while retrieving recent appointments:", error);
  }
};

// --- SEND EMAIL NOTIFICATION ---

//API Key
const resend = new Resend('re_dVijMf5p_Gp63DRiw22evYo3f9cqj7K7p');

export const sendEmailNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createEmail(
      ID.unique(),
      "Appointment Update - Amiani Healthcare", // Subject line
      content,                                   // Body
      [],                                        // Topics (optional)
      [userId]                                   // Target User ID
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending email:", error);
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

    // Compose the email body
    const emailContent = `
      Greetings from Amiani Healthcare.
      
      ${type === "schedule" 
        ? `Your appointment has been successfully confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}.` 
        : `We regret to inform you that your appointment scheduled for ${formatDateTime(appointment.schedule!, timeZone).dateTime} has been cancelled. 
           Reason: ${appointment.cancellationReason}`
      }
      
      Please contact us if you have any questions.
    `;

    // Call the new email function
    await sendEmailNotification(userId, emailContent);

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
