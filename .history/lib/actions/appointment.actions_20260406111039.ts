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
const resend = new Resend('re_KnEjfg2G_KXieN116byNgiku6ATW1MtKJ');


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
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => { // Adding this type fixes the "implicitly any" errors
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw new Error("Appointment not found");

    // Build your message based on whether it's a schedule or cancel action
    const emailBody = `Your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} has been ${type === "schedule" ? 'scheduled' : 'cancelled'}.`;

    // We cast to 'any' or 'Appointment' here so TS knows 'patientId' exists on the returned doc
    const patientData = (updatedAppointment as any).patientId;

    if (patientData?.email) {
      await sendEmailNotification(patientData.email, emailBody);
    } else {
      console.error("No email found for this patient document.");
    }

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("Update failed:", error);
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
