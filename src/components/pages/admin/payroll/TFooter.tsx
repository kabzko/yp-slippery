import TPagination from "./TPagination";
import { useContext } from "react";
import { LogsContext } from "../../../contexts";

export default function TFooter() {
  const { logs } = useContext(LogsContext);
  return (
    <>
      <div className="flex items-center justify-between">
        <p>Total Record/s: <span className="ml-2 font-semibold">{logs?.length || 0}</span></p>
        <TPagination />
      </div>
    </>
  );
}