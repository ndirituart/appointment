import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
//to get patient details and Id
import { getPatient } from "@/lib/actions/patient.actions";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/images/emblem.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-2 h-20 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2026 Amiani HealthCare System
            </p>
            <Link href="/?admin=true" className="text-blue-800">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/my-doc1.jpg"
        height={600}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
  // 1. Fetch the patient document
  const patient = await getPatient(userId);

  // 2. Debugging Log (Check your VS Code Terminal for this!)
  console.log("🔍 FETCHED PATIENT FOR FORM:", patient?.$id);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <AppointmentForm 
            type="create"
            userId={userId}
            patientId={patient?.$id} // This MUST be the document $id
          />
          <p className="copyright mt-10 py-12">© 2026 CarePulse</p>
        </div>
      </section>
    </div>
  );
}

export default Home;