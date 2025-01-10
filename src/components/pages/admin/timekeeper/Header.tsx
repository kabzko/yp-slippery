import Stepper from "./Stepper"
import { useContext } from "react"
import { TimekeeperContext } from "../../../contexts";

const Header = () => {
  const { step, accessType } = useContext(TimekeeperContext)
  
  return (
    <>
      <Stepper step={step} accessType={accessType} />
    </>
  );
};

export default Header;