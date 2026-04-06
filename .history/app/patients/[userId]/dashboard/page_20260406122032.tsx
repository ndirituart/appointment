import Image from "next/image";
import Link from "next/link";
import { getPatientAppointments } from "@/lib/actions/appointment.actions";
import { getPatient } from "@/lib/actions/patient.actions";
import { DataTable } from "@/components/table/DataTable";
import { patientColumns } from "./patientcolumns"; // Import the blueprint
import { Button } from "@/components/ui/button";

const PatientDashboard = async ({ params: { userId } }: SearchParamProps) => {
  // Fetch data directly on the server
  const patient = await getPatient(userId);
  const appointments = await getPatientAppointments(userId);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image src="/assets/icons/logo-full.svg" height={32} width={162} alt="logo" className="h-8 w-fit" />
        </Link>
        <p className="text-16-semibold">Patient Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Hello, {patient?.name} 👋</h1>
          <p className="text-dark-700">View your medical history and appointment status.</p>
        </section>

        {/* Pass the blueprint and the data into the table */}
        <DataTable columns={patientColumns} data={appointments} />

        <section className="flex flex-col items-center gap-6 pb-12">
           <Link href={`/patients/${userId}/new-appointment`}>
             <Button className="shad-primary-btn w-full max-w-[200px]">
               New Appointment
             </Button>
           </Link>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;