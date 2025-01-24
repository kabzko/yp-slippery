import React, { useContext, useState } from "react";
import { DailyLogsContext, LogsContext } from "../../../contexts";
import { MdUnfoldMore } from "react-icons/md";

type TableColumns = 'date' | 'employee' | 'employee_id';

export default function THeaders({
  setRemoveModalState
}: { setRemoveModalState: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { step, payrollProcessType } = useContext(DailyLogsContext);
  const {
    currentLogs, setCurrentLogs,
    setSelectedRows, selectedRows,
    setSelectedLog
  } = useContext(LogsContext);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<TableColumns>('date');

  // chatgpt-ed...
  const handleSort = (column: TableColumns) => {
    setSortColumn(column);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

    const sortedEmpData = [...currentLogs].sort((a, b) => {
      const aValue = (a as any)[column];
      const bValue = (b as any)[column];

      return aValue.localeCompare(bValue) * (sortDirection === 'asc' ? 1 : -1);
    });
    setCurrentLogs(sortedEmpData);
  }

  const handleSelectedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(currentLogs.map((employee) => employee.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    setRemoveModalState(true)
  }

  /* useEffect(() => {
    console.log(selectedRows.map((id: any) => currentLogs.find((item: any) => item.id === id)))
  }, [selectedRows]) */

  return (
    <>
      {/* <th className="th-outer">
        <input disabled={currentLogs?.length === 0}
          type="checkbox"
          onChange={handleSelectedAll}
          checked={currentLogs?.length > 0 && selectedRows?.length === currentLogs?.length}
        />
      </th> */}
      <th className="th-outer" onClick={() => handleSort('date')}>
        <div className="flex flex-row justify-center items-center space-x-1.5">
          <p className="font-semibold">Date</p>
          <span className="text-blue-600"><MdUnfoldMore className="w-4 h-4" /></span>
        </div>
      </th>
      {payrollProcessType === 'manual' && (
        <th className="th-outer" onClick={() => handleSort('employee')}>
        <div className="flex flex-row justify-center items-center space-x-1.5">
          <p className="font-semibold">Name</p>
          <span className="text-blue-600"><MdUnfoldMore className="w-4 h-4" /></span>
        </div>
      </th>
      )}
      <th className="th-outer" onClick={() => handleSort('employee_id')}>
        <div className="flex flex-row justify-center items-center space-x-1.5">
          <p className="font-semibold">Employee ID</p>
          <span className="text-blue-600"><MdUnfoldMore className="w-4 h-4" /></span>
        </div>
      </th>
      <th className="th-outer">
        <p className="font-semibold">Time In</p>
      </th>
      <th className="th-outer">
        <p className="font-semibold">Time Out</p>
      </th>
      <th className="th-outer">
          <p className="font-semibold">Action</p>
          {selectedRows.length > 1 && (
            <p className="text-xs font-normal" onClick={handleDeleteSelected}>Delete Selected</p>
          )}
        </th>
    </>
  );
}