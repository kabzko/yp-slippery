import React, { useState } from "react";
import { TimekeeperContext } from "../../../contexts";

export default function TimekeeperWrapper({ children, }: { children: React.ReactNode; }) {
  const [step, setStep] = useState(1);
  const [accessType, setAccessType] = useState("");
  const [hybridTableType, setHybridTableType] = useState("");
  
  return (
    <TimekeeperContext.Provider value={{ 
      step, setStep, accessType, setAccessType, 
      hybridTableType, setHybridTableType
      }}>
      {children}
    </TimekeeperContext.Provider>
  );
}