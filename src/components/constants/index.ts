type SelfServiceHeaderFields = {
  [step: number]: string[];
};

export const schedFields = ["Schedule Code","Time In","Time Out","Hrs per Day","Restday","Flex Schedule","Breaktime","Flex Hours","Num of Hours","Fixed Hours","Time In 1","Time Out 1","Time In 2","Time Out 2","Time In 3","Time Out 3"];

export const selfServiceHeaderFields: SelfServiceHeaderFields = {
	1: ["location", "department", "position", "employement_type"],
	2: ["schedule_code","time_in","time_out","hours_per_day","rest_day","flex_schedule","breaktime","flex_hours","num_of_hours","fixed_hours","time_in_1","time_out_1","time_in_2","time_out_2","time_in_3","time_out_3"],
	3: ["name"],
	4: ["name"],
	5: ["name"],
	6: ["name"],
}

export const stepToApiUrl: { [step: number]: string } = {
  // 1: "https://yp3.theabbaaccounting.com/api/setup/upload-csv/",
  // 2: "https://yp3.theabbaaccounting.com/api/schedules/import-csv/",
  // 3: "https://yp3.theabbaaccounting.com/api/divisions/import-csv/",
  // 4: "https://yp3.theabbaaccounting.com/api/sections/import-csv/",
  // 5: "https://yp3.theabbaaccounting.com/api/units/import-csv/",
  // 6: "https://yp3.theabbaaccounting.com/api/sub-units/import-csv/",
  1: "https://yp3.yahshuasolutions.com/api/setup/upload-csv/",
  2: "https://yp3.yahshuasolutions.com/api/schedules/import-csv/",
  3: "https://yp3.yahshuasolutions.com/api/divisions/import-csv/",
  4: "https://yp3.yahshuasolutions.com/api/sections/import-csv/",
  5: "https://yp3.yahshuasolutions.com/api/units/import-csv/",
  6: "https://yp3.yahshuasolutions.com/api/sub-units/import-csv/",
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