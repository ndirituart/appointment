"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "../../../../components/StatusBadge";
import { Appointment } from "@/types/appwrite.types";
// REMOVE the Link import from 'lucide-react', it's not used here and might conflict

export const patientColumns: ColumnDef<Appointment>[] = [
  // ... all your column objects here
];

// REMOVE: export default PatientDashboard;