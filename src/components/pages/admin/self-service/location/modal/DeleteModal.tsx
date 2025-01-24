import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CustomToast from "@/components/Toast/CustomToast";
import useDeleteLocation from "../hooks/Location/useDeleteLocation";
import useDeleteDepartment from "../hooks/Department/useDeleteDepartment";
import useDeletePosition from "../hooks/Position/useDeletePosition";
import useDeleteEmploymentType from "../hooks/EmploymentType/useDeleteEmploymentType";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedData: any;
}

type PropertyType = 'locations' | 'departments' | 'positions' | 'employmenttypes';

export function DeleteModal({ selectedData, isOpen, onClose }: ModalProps) {
  const modalClassName = selectedData && isOpen ? 'block absolute z-10' : 'hidden';
  const [selectedColumn, setSelectedColumn] = useState('');
  const [currentData, setCurrentData] = useState<any>({ id: '', property: '', value: '' });
  const text = ` ${currentData.value} ${selectedColumn}?`;
  const queryClient = useQueryClient();
  const deleteLocation = useDeleteLocation();
  const deleteDepartment = useDeleteDepartment();
  const deletePosition = useDeletePosition();
  const deleteEmploymentType = useDeleteEmploymentType();

  const mutationConfigs = {
    locations: {
      mutate: deleteLocation.mutate,
      queryKey: ["locationData"]
    },
    departments: {
      mutate: deleteDepartment.mutate,
      queryKey: ["departmentData"]
    },
    positions: {
      mutate: deletePosition.mutate,
      queryKey: ['positionsData']
    },
    employmenttypes: {
      mutate: deleteEmploymentType.mutate,
      queryKey: ['employementTypesData']
    }
  };

  useEffect(() => {
    if (selectedData) {
      const property = Object.keys(selectedData).find(key => key !== 'id');
      if (!property) {
        return;
      }
      const value = selectedData[property];
      if (!value) {
        return;
      }
      setCurrentData({ id: selectedData.id, property, value });
    }
  }, [selectedData])

  useEffect(() => {
    if (currentData) {
      switch (currentData.property) {
        case 'locations':
          setSelectedColumn('Location');
          break;
        case 'departments':
          setSelectedColumn('Department');
          break;
        case 'positions':
          setSelectedColumn('Position');
          break;
        case 'employmenttypes':
          setSelectedColumn('Employment Type');
          break;
        default:
          setSelectedColumn('');
      }
    }
  }, [currentData])

  const handleAccept = async () => {
    if (currentData.id && currentData.value !== '') {
      const property = Object.keys(selectedData).find(key => key !== 'id') as PropertyType;
      if (!property || !mutationConfigs[property]) {
        console.error('Invalid property or configuration');
        return;
      }

      mutationConfigs[property].mutate(currentData.id, {
        onSuccess: () => {
          toast.custom(
            () => <CustomToast 
              message={`Successfully deleted ${currentData.value} ${selectedColumn}.`} 
              type="success" 
            />,
            { duration: 4000 }
          );
          queryClient.invalidateQueries({ queryKey: mutationConfigs[property].queryKey });
          onClose();
        },
        onError: (error: any) => {
          toast.custom(
            () => <CustomToast 
              message={error.message || `Error deleting ${currentData.value} ${selectedColumn}.`} 
              type="error" 
            />,
            { duration: 4000 }
          );
        }
      });
    } else {
      toast.custom(
        () => <CustomToast message="Invalid input." type="error" />,
        { duration: 4000 }
      );
    }
  };

  const handleCancel = () => {
    onClose()
  };

  return (
    <>
      {isOpen && (
        <div className={`block absolute z-10 ${modalClassName}`}>
          <div className="overflow-y-auto fixed inset-0 z-20">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:pb-6">
                <div className="pb-5 text-center sm:text-left">
                  <div className="flex justify-center mt-2 sm:p-6">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M51.5309 0C23.0704 0 0 23.0704 0 51.5309C0 79.9914 23.0704 103.062 51.5309 103.062C79.9914 103.062 103.062 79.9914 103.062 51.5309C103.062 23.0704 79.9914 0 51.5309 0ZM56.684 77.2964H46.3778V66.9902H56.684V77.2964ZM56.684 56.684H46.3778L43.8013 25.7655H59.2605L56.684 56.684Z" fill="#D65846" />
                    </svg>
                  </div>
                  <h1 className="px-20 text-xl text-center">
                    {selectedData && isOpen ? (
                      <>
                        Are you sure you want to <span className="font-bold text-red-500">delete</span> {text}
                      </>
                    ) : ''}
                  </h1>
                </div>
                <div className="justify-center pr-6 mt-5 w-full sm:mt-4 sm:flex sm:flex-row-reverse sm:pl-6">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button type="button"
                      className="px-12 upload-csv-btn"
                      onClick={handleAccept}
                    >
                      Yes
                    </button>
                  </span>
                  <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button type="button"
                      className="px-12 cancel-upload-csv-btn"
                      onClick={handleCancel}
                    >
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