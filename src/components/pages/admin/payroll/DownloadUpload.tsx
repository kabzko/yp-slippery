import { useState, useContext } from "react";
import UploadCSV from "./modals/UploadCSV";
import { Download, Upload as UploadIcon } from "@mui/icons-material";
import { DailyLogsContext } from "../../../contexts";
import TemplatePreview from "./modals/DownloadTemplatePreview";

function DownloadUpload() {
  const [uploadModalState, setUploadModalState] = useState(false);
  const [previewModalState, setPreviewModalState] = useState(false);
  const { step } = useContext(DailyLogsContext)

  const handlePreviewOpen = () => {
    setPreviewModalState(true)
  }

  const handlePreviewClose = () => {
    setPreviewModalState(false);
  }

  const handleUploadOpen = () => {
    setUploadModalState(true);
  }

  const handleUploadClose = () => {
    setUploadModalState(false);
  }

  return (
    <>
      <UploadCSV isOpen={uploadModalState} onClose={handleUploadClose} />
      <TemplatePreview isOpen={previewModalState} onClose={handlePreviewClose} />
      <div className="flex justify-end space-x-4">
        <div className="relative group">
          <button onClick={handlePreviewOpen} className="flex items-center justify-between px-6 py-2 font-semibold text-blue-500 bg-white rounded outline outline-1 outline-blue-500">
            <Download className="mr-2.5" />
            Download Template
          </button>
          <span className="absolute z-10 w-56 scale-0 rounded-lg bg-[#344960] p-4 text-xs text-white group-hover:scale-100 flex -top-4 -left-60">
            <p className="text-xs font-normal text-left">
              Click this button to download template to import daily logs.
            </p>
            <div className="absolute w-3 h-3 bg-[#344960] transform rotate-45 bottom-5 -right-1.5"></div>
          </span>
        </div>
        <div className="relative group">
          <button onClick={handleUploadOpen} className="flex items-center justify-between px-6 py-2 font-semibold text-blue-500 bg-white rounded outline outline-1 outline-blue-500">
            <UploadIcon className="mr-2.5" />
            Upload file
          </button>
          <span className="absolute z-10 w-40 scale-0 rounded-lg bg-[#344960] p-4 text-xs text-white group-hover:scale-100 flex -top-8 -right-40">
            <p className="text-xs font-normal text-left">
              Click this button to upload the template you have filled out.
            </p>
            <div className="absolute w-3 h-3 bg-[#344960] transform rotate-45 -left-1 bottom-7"></div>
          </span>
        </div>
      </div>
    </>
  );
}

export default DownloadUpload;
