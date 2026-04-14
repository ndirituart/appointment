export const GenderOptions = ["Male", "Female", "Other"];
//adding different departments category
// Added departments for your selection
export const Departments = [
    "Paediatric", 
    "Dental", 
    "General Medicine", 
    "Cardiology", 
    "Maternity",
    "Surgery / Operating Room (OR)",
    "Orthopedics",
    "Neurology",  
    "Intensive Care Unit (ICU)",
    "Oncology",
    "Obstetrics & Gynecology (OB/GYN)",
    "Psychology/Psychiatry",
    "Physiotherapy"
    
    
];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  department: "", //adding department category
  primaryPhysician: "",
  isCashOrMpesa: false, //adding loop to check if the patient is paying with cash or mpesa, if true then insurance fields will be hidden
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  // Paediatric
  { image: "/assets/images/dr-green.png", name: "Dr. Faith Nyambura", department: "Paediatric" },
  { image: "/assets/images/dr-cameron.png", name: "Dr. Jabari Ochieng", department: "Paediatric" },
  { image: "/assets/images/dr-livingston.png", name: "Dr. Purity Mwende", department: "Paediatric" },
  
  // Dental
  { image: "/assets/images/dr-cruz.png", name: "Dr. Evans Kipkurui", department: "Dental" },
  { image: "/assets/images/dr-sharma.png", name: "Dr. Mercy Chebet", department: "Dental" },
  { image: "/assets/images/dr-powell.png", name: "Dr. Silas Mutua", department: "Dental" },
  
  // General Medicine
  { image: "/assets/images/dr-remy.png", name: "Dr. Samuel Okoth", department: "General Medicine" },
  { image: "/assets/images/dr-lee.png", name: "Dr. Halima Abdi", department: "General Medicine" },
  { image: "/assets/images/dr-peter.png", name: "Dr. Kennedy Wafula", department: "General Medicine" },

  //Cardiology
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  
  //Maternity
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },

  //Surgery / Operating Room (OR)
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" },
   { image: "/assets/images/dr-jane", name: "Dr. Jane Mumbua ", department: "Cardiology" }
    
  //Orthopedics

  //Neurology
  
  //Intensive Care Unit (ICU)
  
  //Oncology

  //Obstetrics & Gynecology (OB/GYN)

  //Psychology/Psychiatry

  //Physiotherapy
];
// export const Doctors = [
//   {
//     image: "/assets/images/doctor_8.png",
//     name: "John Green",
//   },
//   {
//     image: "/assets/images/dr-cameron.png",
//     name: "Leila Cameron",
//   },
//   {
//     image: "/assets/images/dr-livingston.png",
//     name: "David Omondi",
//   },
//   {
//     image: "/assets/images/d.jpeg",
//     name: "Steven Kamau",
//   },
//   {
//     image: "/assets/images/d11.jpg",
//     name: "Jane Lonkiya",
//   },
//   {
//     image: "/assets/images/d12.jpg",
//     name: "Yusuf Hassan",
//   },
//   {
//     image: "/assets/images/d14.jpg",
//     name: "Carol Njeri",
//   },
//   {
//     image: "/assets/images/dr-cruz.png",
//     name: "Laksmi Rajesh",
//   },
//   {
//     image: "/assets/images/doctor_8.png",
//     name: "Alex wilson",
//   },
// ];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};