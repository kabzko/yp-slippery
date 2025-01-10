import React from "react";
import { 
  IEmployeeTable, 
  ITimekeeperTable,
  IEmployeeProfileContext, 
  IProgressIndicator, 
  ISelfServiceContext, 
  ITimekeeperContext,
  IDailyLogsContext,
  IDailyLogsTable,
  IPolicyContext
} from "../types/index";

export const EmployeeRegistrationContext = React.createContext<IEmployeeProfileContext>({
  step: 0,
  setStep: () => {},
  stepCompleted: false,
  setStepCompleted: () => {},
});


export const TimekeeperContext = React.createContext<ITimekeeperContext>({
  step: 0,
  setStep: () => {},
  accessType: "",
  setAccessType: () => {},
  hybridTableType: "",
  setHybridTableType: () => {},
});

export const SelfServiceContext = React.createContext<ISelfServiceContext>({
  step: 0,
  setStep: () => {},
  selectedRows: [],
  setSelectedRows: () => {},
});

export const AccountContext = React.createContext<ITimekeeperTable>({
  accounts: [],
  // isLoading: false,
  // isPending: false,
  currentAccounts: [],
  setCurrentAccounts: () => {},
  selectedAccount: {},
  setSelectedAccount: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  maxPage: 1,
  setMaxPage: () => {},
  sendState: {
    account: {
      id: 0,
      username: "",
      email: ""
    },
    isOpen: false,
    type: ""
  },
  setSendState: () => {},
  sentEmailsByID: [],
  setSentEmailsByID: () => {},
  resetPassByID: [],
  setResetPassByID: () => {},
  resetSignInByID: [],
  setResetSignInByID: () => {},
  selectedRows: [],
  setSelectedRows: () => {},
  enabledAccounts: [],
  setEnabledAccounts: () => {},
});

export const DailyLogsContext  = React.createContext<IDailyLogsContext>({
  step: 0,
  setStep: () => {},
  payrollProcessType: "",
  setPayrollProcessType: () => {},
});

export const LogsContext = React.createContext<IDailyLogsTable>({
  logs: [],
  currentLogs: [],
  setCurrentLogs: () => {},
  setLogs: () => {},
  selectedLog: {},
  setSelectedLog: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  // searchTerm: "",
  // setSearchTerm: () => {},
  maxPage: 1,
  setMaxPage: () => {},
  selectedRows: [],
  setSelectedRows: () => {},
});

export const EmployeeContext = React.createContext<IEmployeeTable>({
  employees: [],
  currentEmployees: [],
  setCurrentEmployees: () => {},
  selectedEmployee: {},
  setSelectedEmployee: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  maxPage: 1,
  setMaxPage: () => {},
  sendState: {
    employee: {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
    },
    isOpen: false,
    type: ""
  },
  setSendState: () => {},
  sentEmailsByID: [],
  setSentEmailsByID: () => {},
  resentEmailsByID: [],
  setResentEmailsByID: () => {},
  resetPassByID: [],
  setResetPassByID: () => {},
  resetSignInByID: [],
  setResetSignInByID: () => {},
  selectedRows: [],
  setSelectedRows: () => {},
});

export const ProgressIndicatorContext = React.createContext<IProgressIndicator>({
  showPopup: false,
  setShowPopup: () => {},
  skippedProgress: false,
  setSkippedProgressState: () => {},
  progressState: {
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
  },
  progressDispatch: () => {}
});

// -------------- POLICY CONTEXT ------------------------
export const PolicyContext = React.createContext<IPolicyContext>({
    step: 0,
    setStep: () => {},
    statutorySettings: {
      statutoryType: 'monthly',
      sss: 0,
      philHealth: 0,
      pagIbig: 0,
    },
    progress: 0, 
    setProgress: () => {},
    setStatutorySettings: () => {},
    updateStatutoryType: () => {},
    updateContributions: () => {},
  });

  