import React, { Dispatch, SetStateAction } from "react";

export type Employee = {
  id?: number;
  job_profile?: JobProfile;
  first_name: string;
  last_name: string;
  middle_name?: string;
  extension?: string;
  gender?: string;
  birthday?: string;
  civil_status?: string;
  nationality?: string;
  place_of_birth?: string;
  mother_maiden_name?: string; 
  email: string;
  address?: string;
  region?: string;
  local_address?: string;
  local_address_zip?: number;
  zip_code?: number;
  foreign_address?: string;
  foreign_address_zip?: number;
  rdo_code?: string; 
  contact_num?: string;
  contact_person?: string;
  relationship?: string;
  contact_person_num?: string;
  contact_person_address?: string;
};

export type JobProfile = {
  id?: number;
  employment_type?: string;
  date_hired?: string;
  schedule?: string;
  rate_status?: string;
  department?: string;
  position?: string;
  hrs_per_day?: number;
  basic_salary?: number; // 500.00
  days_per_mos?: number;
  confidential_level?: string;
  salary_effective_date?: string;
  location?: string;
};



// export type JobProfile = {
//   id?: number;
//   employment_type?: "Monthly" | "Hourly"; // Either Monthly or Hourly
//   date_hired?: string;
//   schedule?: string;
//   rate_status?: string;
//   department?: string;
//   position?: string;
//   hrs_per_day?: number;  // For Hourly Employees
//   basic_salary?: number; // For Monthly Employees
//   days_per_mos?: number; // For Monthly Employees, number of days in a month
//   confidential_level?: string;
//   salary_effective_date?: string;
//   location?: string;

//   // For Monthly employees (benefits)
//   sss_monthly?: number;
//   pagibig_monthly?: number;
//   philhealth_monthly?: number;

//   // For Hourly employees (benefits)
//   sss_hourly?: number;
//   pagibig_hourly?: number;
//   philhealth_hourly?: number;
//   hours_per_month?: number;

// };

export interface StatutorySettings {
  statutoryType: 'monthly' | 'hourly' | '';
  sss: number | string;
  philHealth: number | string;
  pagIbig: number | string;
}



export interface Schedule {
  id?: number;
  schedule_code: string;
  time_in: string;
  time_out: string;
  hrs_per_day: number;
  rest_day: "yes" | "no";
  flex_schedule: boolean;
  breaktime: boolean;
  flex_hours: boolean;
  num_of_hours: number;
  fixed_hours: boolean;
  time_in_1: string | null;
  time_out_1: string | null;
  time_in_2: string | null;
  time_out_2: string | null;
  time_in_3: string | null;
  time_out_3: string | null;
}

export interface TimekeeperAccount {
  id: number;
  username: string;
  email: string;
  password?: string;
  attempts?: number;
  generated_password?: string;
  account_type?: string;
  location?: string | string[];
  department?: string | string[];
  rate_status?: string | string[];
}

export interface DailyLog {
  id: number;
  date?: string;
  employee?: any;
  reason?: string;
  timein?: string;
  timeout?: string;
  sync_id?: string;
  timeinImg?: any | null;
  timeoutImg?: any | null;
  timein_reason?: string;
  timeout_reason?: string;
  remove_reason?: any | null;
  is_active?: boolean;
  company?: number;
}

export interface ISendStateTimekeeper {
  isOpen: boolean;
  account: TimekeeperAccount | TimekeeperAccount[];
  type: "resetPass" | "sendEmail" | "resetSignIn" | "enable" | "disable" | "";
}

export interface ISendStateEmployee {
  isOpen: boolean;
  employee: Employee | Employee[];
  type: "resetPass" | "sendEmail" | "resetSignIn" | "resendEmail" | "";
}

export interface IEmployeeTable {
  employees: any[];
  currentEmployees: Employee[];
  setCurrentEmployees: Dispatch<SetStateAction<Employee[]>>;
  selectedEmployee: any;
  setSelectedEmployee: any;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  maxPage: number;
  setMaxPage: Dispatch<SetStateAction<number>>;
  sendState: ISendStateEmployee;
  setSendState: Dispatch<SetStateAction<ISendStateEmployee>>;
  sentEmailsByID: any[];
  setSentEmailsByID: Dispatch<SetStateAction<any[]>>;
  resentEmailsByID: any[];
  setResentEmailsByID: Dispatch<SetStateAction<any[]>>;
  resetPassByID: any[];
  setResetPassByID: Dispatch<SetStateAction<any[]>>;
  resetSignInByID: any[];
  setResetSignInByID: Dispatch<SetStateAction<any[]>>;
  selectedRows: any[];
  setSelectedRows: Dispatch<SetStateAction<any[]>>;
}

export interface ITimekeeperTable {
  accounts: TimekeeperAccount[];
  currentAccounts: TimekeeperAccount[];
  setCurrentAccounts: Dispatch<SetStateAction<TimekeeperAccount[]>>;
  selectedAccount: any;
  setSelectedAccount: any;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  maxPage: number;
  setMaxPage: Dispatch<SetStateAction<number>>;
  sendState: ISendStateTimekeeper;
  setSendState: Dispatch<SetStateAction<ISendStateTimekeeper>>;
  sentEmailsByID: any[];
  setSentEmailsByID: Dispatch<SetStateAction<any[]>>;
  resetPassByID: any[];
  setResetPassByID: Dispatch<SetStateAction<any[]>>;
  resetSignInByID: any[];
  setResetSignInByID: Dispatch<SetStateAction<any[]>>;
  selectedRows: any[];
  setSelectedRows: Dispatch<SetStateAction<any[]>>;
  enabledAccounts: any[];
  setEnabledAccounts: Dispatch<SetStateAction<any[]>>;
}

export interface IEmployeeProfileContext {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  stepCompleted: boolean;
  setStepCompleted: Dispatch<SetStateAction<boolean>>;
}

export interface ITimekeeperContext {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  accessType: string;
  setAccessType: Dispatch<SetStateAction<string>>;
  hybridTableType: string;
  setHybridTableType: Dispatch<SetStateAction<string>>;
}

export interface IDailyLogsContext {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  payrollProcessType: string;
  setPayrollProcessType: Dispatch<SetStateAction<string>>;
}

export interface IDailyLogsTable {
  logs: any[];
  currentLogs: any[];
  setCurrentLogs: Dispatch<SetStateAction<any[]>>;
  setLogs: Dispatch<SetStateAction<any[]>>;
  selectedLog: any;
  setSelectedLog: any;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  // searchTerm: string;
  // setSearchTerm: Dispatch<SetStateAction<string>>;
  maxPage: number;
  setMaxPage: Dispatch<SetStateAction<number>>;
  selectedRows: any[];
  setSelectedRows: Dispatch<SetStateAction<any[]>>;
}

export interface ISelfServiceContext {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  selectedRows: any[];
  setSelectedRows: Dispatch<SetStateAction<any[]>>;
}

export interface progressState {
  steps: {
    [key: string]: {
      progress: number;
      inputs: any;
    };
  };
  overallProgress: number;
}

export interface progressAction {
  type: string;
  payload: {
    step: string;
    progress: number;
    inputs: any;
  };
}

export interface IProgressIndicator {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  skippedProgress: boolean;
  setSkippedProgressState: Dispatch<SetStateAction<boolean>>;
  progressState: progressState;
  progressDispatch: Dispatch<progressAction>;
}


export interface IPolicyContext {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  statutorySettings: StatutorySettings;
  setStatutorySettings: React.Dispatch<React.SetStateAction<StatutorySettings>>;
  updateStatutoryType: (type: 'monthly' | 'hourly') => void;
  updateContributions: (sss: number, philHealth: number, pagIbig: number) => void;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}
