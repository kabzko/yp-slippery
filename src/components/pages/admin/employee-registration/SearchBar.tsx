import React, { useContext } from "react";
import { EmployeeContext } from "../../../contexts";

export default function SearchBar() {
  const { setCurrentPage, setSearchTerm } = useContext(EmployeeContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  }
  
  return (
    <>
      <div className="relative flex items-center h-12 overflow-hidden bg-white rounded-lg w-max ring-1 ring-slate-300">
        <input onChange={handleSearch}
          className="w-full h-full px-4 text-sm text-gray-700 outline-none peer"
          type="text"
          id="search"
          placeholder="Search..."
        />
				<div className="grid w-12 h-full text-gray-300 place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}