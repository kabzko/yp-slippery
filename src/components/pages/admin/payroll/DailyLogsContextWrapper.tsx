import React, { useState } from "react";
import { DailyLogsContext } from "../../../contexts";

export default function DailyLogsWrapper({ children, }: { children: React.ReactNode; }) {
  const [step, setStep] = useState(1);
  const [payrollProcessType, setPayrollProcessType] = useState("");
  
  return (
    <DailyLogsContext.Provider value={{ 
      step, setStep, payrollProcessType, setPayrollProcessType, 
      }}>
      {children}
    </DailyLogsContext.Provider>
  );
}