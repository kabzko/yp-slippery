import { useState, useEffect, useContext } from "react";
import { EmployeeContext, EmployeeRegistrationContext } from "../../../contexts";
import { Employee, ISendStateEmployee } from "../../../types"; 
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from "./helpers/api";

export default function EmployeeWrapper({ children, }: { children: React.ReactNode; }) {
  const [currentEmployees, setCurrentEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPage, setMaxPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<any[] | {}>({})
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const {step} = useContext(EmployeeRegistrationContext)

  const [sendState, setSendState] = useState<ISendStateEmployee>({
    employee: {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
    },
    isOpen: false,
    type: ""
  });

  const [sentEmailsByID, setSentEmailsByID] = useState<any[]>([]);
  const [resentEmailsByID, setResentEmailsByID] = useState<any[]>([]);
  const [resetPassByID, setResetPassByID] = useState<any[]>([]);
  const [resetSignInByID, setResetSignInByID] = useState<any[]>([]);

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: getProfiles
  });

  /* useEffect(() => {
    console.log(employees)
  }, [employees]) */

  useEffect(() => {
    let filteredEmployees = employees;
    if (searchTerm !== '') {
      filteredEmployees = employees?.filter((employee: Employee) => {
        const lastNameMatch = employee?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const firstNameMatch = employee?.first_name.toLowerCase().includes(searchTerm.toLowerCase());
        const emailMatch = employee?.email.toLowerCase().includes(searchTerm.toLowerCase());
        return lastNameMatch || emailMatch || firstNameMatch;
      });
    }

    const start = (currentPage - 1) * 10;
    const end = start + 10;
    setCurrentEmployees(filteredEmployees?.slice(start, end));
    setMaxPage(Math.ceil(filteredEmployees?.length / 10));
  }, [employees, currentPage, searchTerm]);

  useEffect(() => { // temp
    if (sentEmailsByID.length > 0) {
      const timer = setTimeout(() => {
        setSentEmailsByID([]);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [sentEmailsByID]); 

  useEffect(() => { // temp
    if (resentEmailsByID.length > 0) {
      const timer = setTimeout(() => {
        setResentEmailsByID([]);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [resentEmailsByID]); 

  return (
    <EmployeeContext.Provider
      value={{
        employees, sendState, setSendState,
        currentEmployees, setCurrentEmployees,
        selectedEmployee, setSelectedEmployee,
        currentPage, setCurrentPage,
        searchTerm, setSearchTerm,
        maxPage, setMaxPage,
        sentEmailsByID, setSentEmailsByID,
        resentEmailsByID, setResentEmailsByID,
        resetPassByID, setResetPassByID,
        resetSignInByID, setResetSignInByID,
        selectedRows, setSelectedRows
      }}>
      {children}
    </EmployeeContext.Provider>
  );
}
