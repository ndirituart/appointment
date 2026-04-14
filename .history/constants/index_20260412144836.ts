export const GenderOptions = ["Male", "Female", "Other"];
//adding different departments category
// Added departments for your selection
export const Departments = [

    "Paediatric", 
    "Dental", 
    "General Medicine", 
    "Cardiology", 
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
  { image: "/assets/images/dr-sharma.png", name: "Dr. Sharma Patel", department: "Dental" },
  { image: "/assets/images/dr-powell.png", name: "Dr. Silas Mutua", department: "Dental" },
  
  // General Medicine
  { image: "/assets/images/dr-remirez.png", name: "Dr. Samuel Okoth", department: "General Medicine" },
  { image: "/assets/images/dr-lee.png", name: "Dr. Halima Abdi", department: "General Medicine" },
  { image: "/assets/images/dr-peter.png", name: "Dr. Kennedy Wafula", department: "General Medicine" },
  { image: "/assets/images/doctor_8.png", name: "John Green", department: "General Medicine" },
  {  image: "/assets/images/d.jpeg",
    name: "Steven Kamau",
  },
  {
    image: "/assets/images/d11.jpg",
    name: "Jane Lonkiya",
  },
  {
    image: "/assets/images/d12.jpg",
    name: "Yusuf Hassan",
  },
  {
    image: "/assets/images/d14.jpg",
    name: "Carol Njeri",
  },
  
  {
    image: "/assets/images/doctor_8.png",
    name: "Alex wilson",
  },

  //Cardiology
  { image: "/assets/images/dr-jane.jpg", name: "Dr. Jane Mumbua ", department: "Cardiology" },
  { image: "/assets/images/dr-kip.jpg", name: "Dr. John Kipchirchir", department: "Cardiology" },
  
  
  //Obstetrics & Gynecology (OB/GYN)
  { image: "/assets/images/dr-ann.jpg", name: "Dr. Ann Pendo ", department: "OB/GYN" },
  { image: "/assets/images/dr-samantha.jpg", name: "Dr. Samantha Pearl ", department: "OB/GYN" },
  { image: "/assets/images/dr-esther.jpg", name: "Dr. Esther Mwajuma ", department: "OB/GYN" },
  { image: "/assets/images/dr-arnold.jpg", name: "Dr. Arnold Ng'endo ", department: "OB/GYN" },
  { image: "/assets/images/dr-lydia.jpg", name: "Prof Lydia White", department: "OB/GYN" },
  { image: "/assets/images/dr-zola.jpg", name: "Dr. Zolabord Suakei ", department: "OB/GYN" },

  //Surgery / Operating Room (OR)
  { image: "/assets/images/dr-khadija.jpg", name: "Dr. Khadija Muhammad ", department: "Surgery/OR" },
  { image: "/assets/images/dr-halmi.jpg", name: "Dr. Halmi Muthema ", department: "Surgery/OR" },
  { image: "/assets/images/dr-ashley.jpg", name: "Dr. Ashley McCarthy ", department: "Surgery/OR" },
  { image: "/assets/images/dr-neville.jpg", name: "Dr. Neville Omwami ", department: "Surgery/OR" },
   
    
  //Orthopedics
  { image: "/assets/images/dr-mercy.jpg", name: "Dr. Mercy Chebet", department: "Orthopedics" },
  { image: "/assets/images/dr-luke.jpg", name: "Dr. Luke Kyalo ", department: "Orthopedics" },

  //Neurology
  { image: "/assets/images/dr-stan.jpg", name: "Dr. Stan Oluoch", department: "Neurology" },

  //Intensive Care Unit (ICU)
  { image: "/assets/images/dr-joel.jpg", name: "Dr. Joel Arege ", department: "ICU" },
  { image: "/assets/images/dr-pamela.jpg", name: "Dr. Pamela Njeri ", department: "ICU" },
  { image: "/assets/images/dr-zack.jpg", name: "Dr. Zack Ole Teret ", department: "ICU" },

  //Oncology
  { image: "/assets/images/dr-john.jpg", name: "Dr. John Munene ", department: "Oncology" },
   
  //Psychology/Psychiatry
 { image: "/assets/images/dr-natasha.jpg", name: "Dr. Natasha Akech ", department: "Psychology" },
 { image: "/assets/images/dr-faith.jpg", name: "Dr. Faith Nyambura ", department: "Psychology" },
  { image: "/assets/images/dr-angel.jpg", name: "Prof. Angel Imaligat ", department: "Psychiatry" },
 
  //Physiotherapy & Fitness
  { image: "/assets/images/dr-shem.jpg", name: "Dr. Shem Onyango ", department: "Physiotherapy" },
  { image: "/assets/images/dr-yasri.jpg", name: "Dr. Yasri Mwangi ", department: "Fitness" }
];
// export const Doctors = [
//  
//   

// ];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};