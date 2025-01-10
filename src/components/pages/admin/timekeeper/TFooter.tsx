import TPagination from "./TPagination";
import { useContext } from "react";
import { AccountContext } from "../../../contexts";

export default function TFooter() {
  const { accounts } = useContext(AccountContext);
  return (
    <>
      <div className="flex items-center justify-between">
        <p>Total Record/s: <span className="ml-5 font-semibold">{accounts?.length || 0}</span></p>
        <TPagination />
      </div>
    </>
  );
}