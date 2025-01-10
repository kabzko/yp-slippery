import Stepper from "./Stepper"
import { useContext, useEffect } from "react"
import { DailyLogsContext } from "../../../contexts";

const Header = () => {
  const { step, payrollProcessType } = useContext(DailyLogsContext)
  
  useEffect(() => {
    console.log(step, payrollProcessType)
  },[step, payrollProcessType])

  return (
    <>
      <Stepper step={step} payrollProcessType={payrollProcessType} />
    </>
  );
};

export default Header;