"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "../../../../components/StatusBadge";
import { Appointment } from "@/types/appwrite.types";

// We use a NAMED export here (export const...)
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
          <Image src={doctor?.image!} alt={doctor?.name!} width={24} height={24} className="size-8" />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  // ... rest of your status, schedule, and reason columns
];