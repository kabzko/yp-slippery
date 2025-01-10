import TPagination from "./TPagination";
import { useContext } from "react";
import { EmployeeContext } from "../../../contexts";

export default function TFooter() {
  const { employees } = useContext(EmployeeContext);
  
  return (
    <>
      <div className="flex items-center justify-between">
        <p>Total Record/s: <span className="ml-2 font-semibold">{employees?.length || 0}</span></p>
        <TPagination />
      </div>
    </>
  );
}