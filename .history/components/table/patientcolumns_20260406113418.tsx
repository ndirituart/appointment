"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "../StatusBadge";
import { Appointment } from "@/types/appwrite.types";
import { Link } from "lucide-react";

export const patientColumns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician);

        return (
          
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "reason",
    header: "Notes",
    cell: ({ row }) => (
      <p className="text-14-medium min-w-[150px]">{row.original.reason}</p>
    ),
  },
  {
    accessorKey: "cancellationReason",
    header: "Admin Feedback",
    cell: ({ row }) => (
      <p className="text-14-regular text-blue-500">
        {row.original.status === "cancelled" 
          ? row.original.cancellationReason 
          : "N/A"}
      </p>
    ),
  },
];