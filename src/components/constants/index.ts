type SelfServiceHeaderFields = {
  [step: number]: string[];
};

export const schedFields = [
  "Code",
  "Hours per day",
  "Time In",
  "Time Out",
  "Flexible Schedule",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Breaktime",
  "Break Type (Flexible/Fixed)",
  "No. of hours",
  "No. of breaks",
  "From",
  "To",
  "Departments",
  "Locations"
];

export const selfServiceHeaderFields: SelfServiceHeaderFields = {
  1: ["location", "department", "position", "employement_type"],
  2: [
    "Code",
    "Hours per day",
    "Time In",
    "Time Out",
    "Flexible Schedule",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Breaktime",
    "Break Type (Flexible/Fixed)",
    "No. of hours",
    "No. of breaks",
    "From",
    "To",
    "Departments",
    "Locations"
  ],
  3: ["name"],
  4: ["name"],
  5: ["name"],
  6: ["name"],
}

export const stepToApiUrl: { [step: number]: string } = {
  1: "/api/setup/upload-csv/",
  2: "/api/schedules/import-csv/",
  3: "/api/divisions/import-csv/",
  4: "/api/sections/import-csv/",
  5: "/api/units/import-csv/",
  6: "/api/sub-units/import-csv/",
};

export const initialState = {
  steps: {
    selectBusinessIndustryType: {
      progress: 0,
      inputs: null,
    },
    setupMiscellaneousList: {
      progress: 0,
      inputs: null,
    },
    registerEmployees: {
      progress: 0,
      inputs: null,
    },
    setUpTimeKeeper: {
      progress: 0,
      inputs: null,
    },
    importDailyLogs: {
      progress: 0,
      inputs: null,
    },
    setUpCompanyPolicies: {
      progress: 0,
      inputs: null,
    }
  },
  overallProgress: 0,
};