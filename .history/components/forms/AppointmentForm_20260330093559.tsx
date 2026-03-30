"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";


import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomForm";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

 const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
  setIsLoading(true);
  console.log("🚀 Submitting Form:", { type, values, patientId }); // Check what's coming from the form

  // ... (your switch statement for status)

  try {
    if (type === "create" && patientId) {
      const appointment = { /* ... your object */ };
      
      console.log("📁 Creating Appointment with:", appointment);
      const newAppointment = await createAppointment(appointment);

      if (newAppointment) {
        console.log("✅ Success: Appointment created", newAppointment.$id);
        form.reset();
        router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`);
      }
    } else {
      const appointmentToUpdate = { /* ... your object */ };

      console.log("🔄 Updating Appointment:", appointmentToUpdate);
      const updatedAppointment = await updateAppointment(appointmentToUpdate);

      if (updatedAppointment) {
        console.log("✅ Success: Appointment updated");
        setOpen && setOpen(false);
        form.reset();
      }
    }
  } catch (error) {
    // 🔴 Better Error Logging
    console.error(`❌ Error in AppointmentForm (${type}):`, error);
  }
  setIsLoading(false);
};

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-
                 gap-6  ${type === "create" && "xl:flex-row"}`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual or monthly check-up"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};