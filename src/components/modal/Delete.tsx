'use client'
import toast from "react-hot-toast";
import React, { FC, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomToast from "@/components/Toast/CustomToast";
import { deleteLocationData } from '@/components/pages/self-service/location/hooks/useLocationQueries';
import { deleteDepartmentData } from '@/components/pages/self-service/location/hooks/useDepartmentQueries';
import { deletePositionData } from '@/components/pages/self-service/location/hooks/usePositionsQueries';
import { deleteEmploymentTypeData } from '@/components/pages/self-service/location/hooks/useEmploymentTypeQueries';
import { deleteScheduleData } from '@/components/pages/self-service/schedule/hooks/useScheduleQueries';
import { deleteDivisionData } from '@/components/pages/self-service/division/hooks/useDivisionQuery';
import { deleteSectionData } from '@/components/pages/self-service/section/hooks/useSectionsQueries';
import { deleteUnitData } from '@/components/pages/self-service/Unit/hooks/useUnitQueries';
import { deleteSubUnitData } from '@/components/pages/self-service/subunit/hooks/useSubUnitQueries';


interface ModalProps {
  message?: any;
  isOpen: boolean;
  onClose: () => void;
  selectedData: any;
  // setData?: React.Dispatch<React.SetStateAction<any[]>>;
  selectedRows: any[];
  setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteModal: FC<ModalProps> = ({ isOpen, onClose, selectedData, selectedRows, setSelectedRows }: ModalProps) => {
  const modalClassName = isOpen && selectedData ? "block absolute z-10" : "hidden";
  const [value, setValue] = useState('')

  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedData) {
      console.log("selectedData:", selectedData)
      if (!Array.isArray(selectedData)) {
        setValue(selectedData.value)
      }
    }
  }, [selectedData, isOpen]);

  const showToast = (message: string, type: string) => {
    toast.custom(() => <CustomToast message={message} type={type} />, {
      duration: 4000,
    });
  };

  const mutationConfigs = {
    locations: {
      mutationFn: deleteLocationData,
      queryKey: ["locationData"]
    },
    departments: {
      mutationFn: deleteDepartmentData,
      queryKey: ["departmentData"]
    },
    positions: {
      mutationFn: deletePositionData,
      queryKey: ['positionsData']
    },
    employmenttypes: {
      mutationFn: deleteEmploymentTypeData,
      queryKey: ['employementTypesData']
    },
    schedule: {
      mutationFn: deleteScheduleData,
      queryKey: ['schedulesData']
    },
    divisions: {
      mutationFn: deleteDivisionData,
      queryKey: ['divisionData']
    },
    sections: {
      mutationFn: deleteSectionData,
      queryKey: ['sectionsData']
    },
    units: {
      mutationFn: deleteUnitData,
      queryKey: ['unitsData']
    },
    subUnits: {
      mutationFn: deleteSubUnitData,
      queryKey: ['subUnitsData']
    }
  };

  const mutations = Object.fromEntries(
    Object.entries(mutationConfigs).map(([property, config]) => [
      property,
      useMutation({
        mutationFn: config.mutationFn,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: config.queryKey });
        },
        // throwOnError: true,
        onError: (error: any) => {
          showToast(error.message, "error");
        },
      }),
    ])
  );

  const handleAccept = async () => {
    if (!selectedData) {
      return;
    }

    let dataToProcess = Array.isArray(selectedData) ? selectedData : [selectedData];
    console.log(dataToProcess)
    const deletionPromises = dataToProcess.map((data: any) => {
      const dataSource = data.dataSource;
      return mutations[dataSource].mutateAsync(data.id);
    });

    Promise.all(deletionPromises)
      .then(() => {
        // queryClient.refetchQueries({ stale: true }); // doesn't update ui
        showToast(`Successfully deleted items.`, "success");
        queryClient.resetQueries({ stale: true }); // updates ui
        onClose();
        setSelectedRows([]);
      })
      .catch((error: any) => {
        showToast(error.message, "error");
      });
  };

  const handleClose = () => {
    onClose();
    setSelectedRows([]);
  };

  return (
    <>
      {isOpen && (
        <div className={`modal block absolute z-10`}>
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:pb-6">
                <div className="text-center sm:text-left pb-5">
                  <div className="mt-2 sm:p-6 flex justify-center">
                    <svg
                      width="104"
                      height="104"
                      viewBox="0 0 104 104"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M51.5309 0C23.0704 0 0 23.0704 0 51.5309C0 79.9914 23.0704 103.062 51.5309 103.062C79.9914 103.062 103.062 79.9914 103.062 51.5309C103.062 23.0704 79.9914 0 51.5309 0ZM56.684 77.2964H46.3778V66.9902H56.684V77.2964ZM56.684 56.684H46.3778L43.8013 25.7655H59.2605L56.684 56.684Z"
                        fill="#D65846"
                      />
                    </svg>
                  </div>
                  <h1 className="text-xl px-20 text-center">
                    {selectedRows?.length === 1 ? `Are you sure you want to delete ${value}?` : `Are you sure you want to delete these items?`}
                  </h1>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse pr-6 sm:pl-6 justify-center w-full">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex justify-center drop-shadow-xl w-full rounded-md border border-transparent px-20 py-2 bg-[#D65846] text-base leading-6 font-bold text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={handleAccept}>
                      Yes
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex justify-center drop-shadow-xl w-full rounded-md border border-blue-600 px-20 py-2 bg-white text-base leading-6 font-bold text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={handleClose}>
                      No
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
