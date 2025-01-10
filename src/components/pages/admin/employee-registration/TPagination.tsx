import { useContext } from "react";
import { EmployeeContext } from "../../../contexts";
import { ChevronRightRounded, ChevronLeftRounded } from "@mui/icons-material";

export default function TPagination() {
  const { setCurrentPage, currentPage, maxPage, setSelectedRows } = useContext(EmployeeContext);

  const handlePrevTPage = () => {
    setSelectedRows([]);
    setCurrentPage((old) => Math.max(old - 1, 1)) // chatgpt-ed...
  }

  const handleNextTPage = () => {
    setSelectedRows([]);
    setCurrentPage((old) => Math.min(old + 1, maxPage)) // chatgpt-ed...
  }

  return (
    <div className="flex flex-row items-center space-x-3">
			<p>Record per page: <span className="ml-5 font-semibold">10</span></p> 
      <div className="flex flex-row items-center space-x-4">
        <button onClick={handlePrevTPage}>
          <ChevronLeftRounded />
        </button>
        <p className="font-semibold text-blue-700">{currentPage}</p>
        <button onClick={handleNextTPage}>
          <ChevronRightRounded />
        </button>
      </div>
    </div>
  );
}