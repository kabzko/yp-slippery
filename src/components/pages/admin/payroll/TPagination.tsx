import { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { LogsContext } from "../../../contexts";

export default function TPagination() {
  const { setCurrentPage, currentPage, maxPage, setSelectedRows } = useContext(LogsContext);

  const handlePrevTPage = () => {
    setSelectedRows([]);
    setCurrentPage((old) => Math.max(old - 1, 1))
  }

  const handleNextTPage = () => {
    setSelectedRows([]);
    setCurrentPage((old) => Math.min(old + 1, maxPage))
  }

  return (
    <div className="flex flex-row items-center space-x-3">
			<p>Record per page: <span className="ml-5 font-semibold">10</span></p> 
      <div className="flex flex-row items-center space-x-4">
        <button onClick={handlePrevTPage}>
          <MdChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="font-semibold text-blue-700">{currentPage}</p>
        <button onClick={handleNextTPage}>
          <MdChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}