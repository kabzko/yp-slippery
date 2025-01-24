import { FC, useContext, useEffect, useState } from 'react';
import classNames from '../../../../../helpers/classNames';
import Step from '../../../../stepper/Step';
import { contactRelationship, nationalities, regionsPH } from '../helpers/constants';
import { EmployeeContext } from '../../../../contexts';
import { initialEmployeeProfileValues } from '../helpers/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useUpdateProfile from '../hooks/useUpdateEmployee';
import type { Employee } from "../../../../types";
import toast from "react-hot-toast";
import CustomToast from "../../../../Toast/CustomToast"
import { useQueryClient } from '@tanstack/react-query';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Convert Yup schema to Zod schema
const updateEmpProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  middle_name: z.string().nullable(),
  extension: z.string().nullable(),
  gender: z.string().nullable(),
  birthday: z.string().nullable(),
  civilStatus: z.string().nullable(),
  nationality: z.string().nullable(),
  place_of_birth: z.string().nullable(),
  mother_maiden_name: z.string().nullable(),
  email: z.string().email().nullable(),
  address: z.string().nullable(),
  region: z.string().nullable(),
  local_address: z.string().nullable(),
  local_address_zip: z.number().nullable(),
  foreign_address: z.string().nullable(),
  foreign_address_zip: z.number().nullable(),
  rdo_code: z.number().nullable(),
  contact_num: z.string().nullable(),
  contact_person: z.string().nullable(),
  relationship: z.string().nullable(),
  contact_person_num: z.string().nullable(),
  contact_person_address: z.string().nullable(),
});

type FormValues = z.infer<typeof updateEmpProfileSchema>;

export default function UpdateEmployeeModal({ isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState("EmployeeInfo");
  const { selectedEmployee, setSelectedRows } = useContext(EmployeeContext);
  const { mutate } = useUpdateProfile();
  const queryClient = useQueryClient();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(updateEmpProfileSchema),
    defaultValues: initialEmployeeProfileValues
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "ContactInfo":
        return <ContactInfo register={register} errors={errors} watch={watch} />;
      case "EmergencyContact":
        return <EmergencyContact register={register} errors={errors} watch={watch} />;
      case "EmployeeInfo":
        return <EmployeeInfo register={register} errors={errors} watch={watch} />;
      default:
        return <EmployeeInfo register={register} errors={errors} watch={watch} />;
    }
  };

  useEffect(() => {
    if (isOpen && selectedEmployee) {
      setSelectedRows([selectedEmployee.id]);
    }
  }, [isOpen, selectedEmployee]);

  const onSubmit = async (data: FormValues) => {
    const processedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? null : value
      ])
    ) as FormValues;

    const filteredData = Object.fromEntries(
      Object.entries(processedData).filter(([_, value]) => value !== null)
    );

    const updatedProfile = {
      id: selectedEmployee.id,
      ...filteredData,
    };

    mutate(updatedProfile, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        toast.custom(
          () => <CustomToast message="Successfully updated employee." type="success" />,
          { duration: 4000 }
        );
        handleClose();
      },
      onError: (error: any) => {
        toast.custom(
          () => <CustomToast message={error.message} type="error" />,
          { duration: 4000 }
        );
      },
    });
  };

  const handleClose = () => {
    onClose();
    setActiveTab("EmployeeInfo");
  };

  useEffect(() => {
    if (selectedEmployee) {
      const { birthday } = selectedEmployee;
      if (birthday && !isNaN(Date.parse(birthday))) {
        selectedEmployee.birthday = new Date(birthday).toISOString().split("T")[0];
      }

      const keys = Object.keys(initialEmployeeProfileValues) as (keyof Employee)[];
      keys.forEach((key) => {
        let value = selectedEmployee[key];
        if (value === null || value === undefined) {
          if (key === 'foreign_address_zip' || key === 'local_address_zip') {
            value = 0;
          }
        } else {
          setValue(key as any, value);
        }
      });
    }
  }, [selectedEmployee, setValue]);

  return (
    <>
      {isOpen && (
        <div className="block absolute z-50">
          <div className="overflow-y-auto fixed inset-0">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle w-fit sm:mx-6 md:mx-28">
                <div className="text-center sm:text-left">
                  <div className="flex justify-between p-5 w-full bg-blue-600">
                    <h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
                      Update Employee Profile
                    </h3>
                    <button onClick={() => { reset(); setSelectedRows([]); handleClose(); }}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-start mx-8 mt-5 mb-3">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                      <li className="me-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("EmployeeInfo")}
                          className={classNames('inline-block px-4 py-3 rounded-lg', activeTab === 'EmployeeInfo' ? 'text-white bg-blue-600': 'bg-white text-slate-900')}>
                          Employee Information
                        </button>
                      </li>
                      <li className="me-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("ContactInfo")}
                          className={classNames('inline-block px-4 py-3 rounded-lg', activeTab === 'ContactInfo' ? 'text-white bg-blue-600': 'bg-white text-slate-900')}>
                          Contact Information
                        </button>
                      </li>
                      <li className="me-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("EmergencyContact")}
                          className={classNames('inline-block px-4 py-3 rounded-lg', activeTab === 'EmergencyContact' ? 'text-white bg-blue-600': 'bg-white text-slate-900')}>
                          Emergency Contact
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="mx-10">
                    <p
                      onClick={() => reset(initialEmployeeProfileValues)}
                      className="mb-3 underline cursor-pointer text-end">
                      Clear All
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {renderTabContent()}
                      <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 sm:px-6">
                        <button
                          type="button"
                          onClick={() => { reset(); setSelectedRows([]); handleClose(); }}
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const EmployeeInfo: FC<{ register: any, errors: any, watch: any }> = ({ register, errors, watch }) => {
  return (
    <>
      <div>
        <label htmlFor="first_name" className="label-modal">
          First Name
        </label>
        <input
          className="input-text-modal"
          {...register("first_name")}
          type="text"
          id="first_name"
          placeholder="Enter First Name..."
        />
        <div className="mt-1 text-red-500">{errors.first_name?.message}</div>
      </div>
      <div>
        <label htmlFor="middle_name" className="label-modal">
          Middle Name
        </label>
        <input
          className="input-text-modal"
          {...register("middle_name")}
          type="text"
          id="middle_name"
          placeholder="Enter Middle Name..."
        />
        <div className="mt-1 text-red-500">{errors.middle_name?.message}</div>
      </div>
      <div>
        <label htmlFor="last_name" className="label-modal">
          Last Name
        </label>
        <input
          className="input-text-modal"
          {...register("last_name")}
          type="text"
          id="last_name"
          placeholder="Enter Last Name..."
        />
        <div className="mt-1 text-red-500">{errors.last_name?.message}</div>
      </div>
      <div>
        <label htmlFor="extension" className="label-modal">
          Extension
        </label>
        <input
          className="input-text-modal"
          {...register("extension")}
          type="text"
          id="extension"
          placeholder="Enter Extension (e.g Sr., Jr., III)"
        />
        <div className="mt-1 text-red-500">{errors.extension?.message}</div>
      </div>
      <div>
        <label htmlFor="gender" className="label-modal">
          Gender
        </label>
        <select
          className="input-text-modal"
          {...register("gender")}
          id="gender"
        >
          <option value="">Select gender:</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="Other">Other</option>
        </select>
        <div className="mt-1 text-red-500">{errors.gender?.message}</div>
      </div>
      <div>
        <label htmlFor="birthday" className="label-modal">
          Birthday
        </label>
        <input
          className="input-text-modal"
          {...register("birthday")}
          type="date"
          id="birthday"
          placeholder="Select date"
        />
        <div className="mt-1 text-red-500">{errors.birthday?.message}</div>
      </div>
      <div>
        <label htmlFor="civilStatus" className="label-modal">
          Civil Status
        </label>
        <select
          className="input-text-modal"
          {...register("civilStatus")}
          id="civilStatus"
        >
          <option value="">Select civil status:</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Separated">Separated</option>
          <option value="Widowed">Widowed</option>
          <option value="Other">Other</option>
        </select>
        <div className="mt-1 text-red-500">{errors.civilStatus?.message}</div>
      </div>
      <div>
        <label htmlFor="nationality" className="label-modal">
          Nationality
        </label>
        <select
          className="input-text-modal"
          {...register("nationality")}
          id="nationality"
        >
          <option value="">Select nationality:</option>
          {nationalities.map((nationality) => {
            return (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            )
          })}
        </select>
        <div className="mt-1 text-red-500">{errors.nationality?.message}</div>
      </div>
      <div>
        <label htmlFor="place_of_birth" className="label-modal">
          Place of Birth
        </label>
        <input
          className="input-text-modal"
          {...register("place_of_birth")}
          type="text"
          id="place_of_birth"
          placeholder="Enter Place of Birth..."
        />
        <div className="mt-1 text-red-500">{errors.place_of_birth?.message}</div>
      </div>
      <div>
        <label htmlFor="mother_maiden_name" className="label-modal">
          Mother's Maiden Name
        </label>
        <input
          className="input-text-modal"
          {...register("mother_maiden_name")}
          type="text"
          id="mother_maiden_name"
          placeholder="Enter Mother's Maiden Name..."
        />
        <div className="mt-1 text-red-500">{errors.mother_maiden_name?.message}</div>
      </div>
    </>
  );
};

const ContactInfo: FC<{ register: any, errors: any, watch: any }> = ({ register, errors, watch }) => {
  return (
    <>
      <div>
        <label htmlFor="email" className="label-modal">
          Email
        </label>
        <input
          className="input-text-modal"
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter Email..."
        />
        <div className="mt-1 text-red-500">{errors.email?.message}</div>
      </div>
      <div>
        <label htmlFor="address" className="label-modal">
          Address
        </label>
        <input
          className="input-text-modal"
          {...register("address")}
          type="text"
          id="address"
          placeholder="Enter Address..."
        />
        <div className="mt-1 text-red-500">{errors.address?.message}</div>
      </div>
      <div>
        <label htmlFor="region" className="label-modal">
          Region
        </label>
        <select
          className="input-text-modal"
          {...register("region")}
          id="region"
        >
          <option value="">Select region:</option>
          {regionsPH.map((region) => {
            return (
              <option key={region} value={region}>
                {region}
              </option>
            );
          })}
        </select>
        <div className="mt-1 text-red-500">{errors.region?.message}</div>
      </div>
      <div>
        <label htmlFor="local_address" className="label-modal">
          Local Home Address
        </label>
        <input
          className="input-text-modal"
          {...register("local_address")}
          type="text"
          id="local_address"
          placeholder="Enter Local Home Address..."
        />
        <div className="mt-1 text-red-500">{errors.local_address?.message}</div>
      </div>
      <div>
        <label htmlFor="local_address_zip" className="label-modal">
          Local Home Address Zip Code
        </label>
        <input
          className="input-text-modal"
          {...register("local_address_zip")}
          type="number"
          id="local_address_zip"
          placeholder="Enter Local Home Address Zip Code..."
        />
        <div className="mt-1 text-red-500">{errors.local_address_zip?.message}</div>
      </div>
      <div>
        <label htmlFor="foreign_address" className="label-modal">
          Foreign Address
        </label>
        <input
          className="input-text-modal"
          {...register("foreign_address")}
          type="string"
          id="foreign_address"
          placeholder="Enter Foreign Address..."
        />
        <div className="mt-1 text-red-500">{errors.foreign_address?.message}</div>
      </div>
      <div>
        <label htmlFor="foreign_address_zip" className="label-modal">
          Foreign Address Zip Code
        </label>
        <input
          className="input-text-modal"
          {...register("foreign_address_zip")}
          type="number"
          id="foreign_address_zip"
          placeholder="Enter Foreign Address Zip Code..."
        />
        <div className="mt-1 text-red-500">{errors.foreign_address_zip?.message}</div>
      </div>
      <div>
        <label htmlFor="rdo_code" className="label-modal">
          RDO Code
        </label>
        <input
          className="input-text-modal"
          {...register("rdo_code")}
          type="number"
          id="rdo_code"
          placeholder="Enter RDO Code..."
        />
        <div className="mt-1 text-red-500">{errors.rdo_code?.message}</div>
      </div>
      <div>
        <label htmlFor="contact_num" className="label-modal">
          Contact Number
        </label>
        <input
          className="input-text-modal"
          {...register("contact_num")}
          type="text"
          id="contact_num"
          placeholder="Enter Contact Number..."
        />
        <div className="mt-1 text-red-500">{errors.contact_num?.message}</div>
      </div>
    </>
  );
};

const EmergencyContact: FC<{ register: any, errors: any, watch: any }> = ({ register, errors, watch }) => {
  return (
    <>
      <div>
        <label htmlFor="contact_person" className="label-modal">
          Contact Person
        </label>
        <input
          className="input-text-modal"
          {...register("contact_person")}
          type="text"
          id="contact_person"
          placeholder="Enter Contact Person..."
        />
        <div className="mt-1 text-red-500">{errors.contact_person?.message}</div>
      </div>
      <div>
        <label htmlFor="relationship" className="label-modal">
          Relationship
        </label>
        <select
          className="input-text-modal"
          {...register("relationship")}
          id="relationship"
        >
          <option value="">Select relationship:</option>
          {contactRelationship.map((relationship) => {
            return (
              <option key={relationship} value={relationship}>
                {relationship}
              </option>
            )
          })}
        </select>
        <div className="mt-1 text-red-500">{errors.relationship?.message}</div>
      </div>
      <div>
        <label htmlFor="contact_person_num" className="label-modal">
          Contact Person Number
        </label>
        <input
          className="input-text-modal"
          {...register("contact_person_num")}
          type="text"
          id="contact_person_num"
          placeholder="Enter Contact Person Number..."
        />
        <div className="mt-1 text-red-500">{errors.contact_person_num?.message}</div>
      </div>
      <div>
        <label htmlFor="contact_person_address" className="label-modal">
          Contact Person Address
        </label>
        <input
          className="input-text-modal"
          {...register("contact_person_address")}
          type="text"
          id="contact_person_address"
          placeholder="Enter Contact Person Address..."
        />
        <div className="mt-1 text-red-500">{errors.contact_person_address?.message}</div>
      </div>
    </>
  );
};

const Stepper = ({ step }: { step: number }) => {
  return (
    <div className="flex flex-col items-center mx-10 my-3 bg-white md:flex-row">
      <Step
        isActive={step === 1}
        isCompleted={step > 1}
        stepNumber={1}
        stepName="Personal Information"
      />
      <hr className="mx-2 w-full md:w-16"></hr>
      <Step
        isActive={step === 2}
        isCompleted={step > 2}
        stepNumber={2}
        stepName="Contact Information"
      />
      <hr className="mx-2 w-full md:w-16"></hr>
      <Step
        isActive={step === 3}
        isCompleted={step > 3}
        stepNumber={3}
        stepName="Emergency Contact"
      />
    </div>
  );
};
