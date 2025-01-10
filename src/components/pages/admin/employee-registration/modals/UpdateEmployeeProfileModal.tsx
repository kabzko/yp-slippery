import { FC, useContext, useEffect, useState } from 'react';
import classNames from '../../../../../helpers/classNames';
import Step from '../../../../stepper/Step';
import { contactRelationship, nationalities, regionsPH } from '../helpers/constants';
import { EmployeeContext } from '../../../../contexts';
import { initialEmployeeProfileValues, updateEmpProfileSchema } from '../helpers/utils';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import useUpdateProfile from '../hooks/useUpdateEmployee';
import type { Employee } from "../../../../types";
import toast from "react-hot-toast";
import CustomToast from "../../../../Toast/CustomToast"
import { useQueryClient } from '@tanstack/react-query';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateEmployeeModal({ isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState("EmployeeInfo");
  const { selectedEmployee, setSelectedRows } = useContext(EmployeeContext)
  const { mutate} = useUpdateProfile()
  const queryClient = useQueryClient()

  const renderTabContent = () => {
    switch (activeTab) {
      case "ContactInfo":
        return <ContactInfo />;
      case "EmergencyContact":
        return <EmergencyContact />;
      case "EmployeeInfo":
        return <EmployeeInfo />;
      default:
        return <EmployeeInfo />;
    }
  };

  useEffect(() => {
    if (isOpen && selectedEmployee) {
      setSelectedRows([selectedEmployee.id])
    }
  }, [isOpen, selectedEmployee])

  // useEffect(() => {
  //   console.log(selectedEmployee)
  // }, [selectedEmployee])

  const handleSubmit = async (data: any) => {
    const keys = Object.keys(data)
    keys.forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null)
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
    setActiveTab("EmployeeInfo")
  };

  return (
    <>
      {(isOpen) && (
        <div className="block absolute z-50">
          <div className="overflow-y-auto fixed inset-0">
            <div className="flex justify-center items-center px-4 pt-2 pb-20 min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle w-fit sm:mx-6 md:mx-28">
                <div className="text-center sm:text-left">
                  <Formik
                    initialValues={initialEmployeeProfileValues}
                    validationSchema={updateEmpProfileSchema}
                    onSubmit={(values, actions) => {
                      if (typeof values.foreign_address_zip === 'string' && values.foreign_address_zip !== '') {
                        values.foreign_address_zip = Number(values.foreign_address_zip);
                      }
                      if (typeof values.local_address_zip === 'string' && values.local_address_zip !== '') {
                        values.local_address_zip = Number(values.local_address_zip);
                      }

                      // console.log(values)
                      handleSubmit(values);
                      actions.resetForm({
                        values: initialEmployeeProfileValues,
                      });
                    }} enableReinitialize>
                    {({ isSubmitting, resetForm, setFieldValue, setValues, errors, isValid }) => {

                      useEffect(() => {
                        if (selectedEmployee) {
                          const { birthday } = selectedEmployee;
                          if (!birthday && !isNaN(Date.parse(birthday))) {
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
                              setFieldValue(key, value, false);
                            }
                          });
                        }
                      }, [selectedEmployee]);

                      useEffect(() => {
                        console.log(errors)
                      }, [errors])

                      return (
                        <span>
                          <div className="flex justify-between p-5 w-full bg-blue-600">
                            <h3 className="pr-2 text-lg font-medium leading-6 text-white truncate">
                              Update Employee Profile
                            </h3>
                            <button onClick={() => { resetForm(); setSelectedRows([]); handleClose() }}>
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
                                  onClick={() => setActiveTab("EmployeeInfo")}
                                  className={classNames('inline-block px-4 py-3 rounded-lg', activeTab === 'EmployeeInfo' ? 'text-white bg-blue-600': 'bg-white text-slate-900')}>
                                  Employee Information
                                </button>
                              </li>
                              <li className="me-2">
                                <button
                                  onClick={() => setActiveTab("ContactInfo")}
                                  className={classNames('inline-block px-4 py-3 rounded-lg', activeTab === 'ContactInfo' ? 'text-white bg-blue-600': 'bg-white text-slate-900')}>
                                  Contact Information
                                </button>
                              </li>
                              <li className="me-2">
                                <button
                                  onClick={() =>
                                    setActiveTab("EmergencyContact")
                                  }
                                  className={classNames('inline-block px-4 py-3 rounded-lg', activeTab === 'EmergencyContact' ? 'text-white bg-blue-600': 'bg-white text-slate-900')}>
                                  Emergency Contact
                                </button>
                              </li>
                            </ul>
                            <div></div>
                          </div>
                          <div className="mx-10">
                            <p
                              onClick={() =>
                                setValues(initialEmployeeProfileValues)
                              }
                              className="mb-3 underline cursor-pointer text-end">
                              Clear All
                            </p>
                            <Form>
                              <div className="grid gap-5 mb-4 sm:grid-cols-2 lg:grid-cols-3">
                                {renderTabContent()}
                              </div>
                              <div className="justify-between my-7 sm:flex sm:flex-row-reverse">
                                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                  <button disabled={isSubmitting || !isValid} type={isValid ? "submit" : "button"}
                                    className={`inline-flex justify-center px-10 py-2 w-full text-base font-bold leading-6 text-white bg-blue-600 rounded-md border border-blue-600 shadow-sm transition duration-150 ease-in-out focus:outline-none hover:bg-blue-500 hover:shadow-md focus:shadow-outline-blue sm:text-sm sm:leading-5`}>
                                    {isSubmitting ? "Submitting..." : !isValid ? "Invalid fields" : "Save Updates"}
                                  </button>
                                </span>
                                <span className="flex mt-3 w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                  <button type="button" onClick={() => { resetForm(); setSelectedRows([]); handleClose(); }}
                                    className="px-16 cancel-upload-csv-btn">
                                      Close
                                  </button>
                                </span>
                              </div>
                            </Form>
                          </div>
                        </span>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const EmployeeInfo: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="first_name" className="label-modal">
          First Name
        </label>
        <Field
          className="input-text-modal"
          name="first_name"
          type="text"
          id="first_name"
          placeholder="Enter First Name..."
        />
        <ErrorMessage
          name="first_name"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="middle_name" className="label-modal">
          Middle Name
        </label>
        <Field
          className="input-text-modal"
          name="middle_name"
          type="text"
          id="middle_name"
          placeholder="Enter Middle Name..."
        />
        <ErrorMessage
          name="middle_name"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="last_name" className="label-modal">
          Last Name
        </label>
        <Field
          className="input-text-modal"
          name="last_name"
          type="text"
          id="last_name"
          placeholder="Enter Last Name..."
        />
        <ErrorMessage
          name="last_name"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="extension" className="label-modal">
          Extension
        </label>
        <Field
          className="input-text-modal"
          name="extension"
          type="text"
          id="extension"
          placeholder="Enter Extension (e.g Sr., Jr., III)"
        />
        <ErrorMessage
          name="extension"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="gender" className="label-modal">
          Gender
        </label>
        <Field
          className="input-text-modal"
          name="gender"
          id="gender"
          as="select">
          <option value="">Select gender:</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="Other">Other</option>
        </Field>
        <ErrorMessage
          name="gender"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="birthday" className="label-modal">
          Birthday
        </label>
        <Field
          className="input-text-modal"
          name="birthday"
          type="date"
          id="birthday"
          placeholder="Select date"
        />
        <ErrorMessage
          name="birthday"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="civilStatus" className="label-modal">
          Civil Status
        </label>
        <Field
          className="input-text-modal"
          name="civilStatus"
          id="civilStatus"
          as="select">
          <option value="">Select civil status:</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Separated">Separated</option>
          <option value="Widowed">Widowed</option>
          <option value="Other">Other</option>
        </Field>
        <ErrorMessage
          name="civilStatus"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="nationality" className="label-modal">
          Nationality
        </label>
        <Field
          className="input-text-modal"
          name="nationality"
          id="nationality"
          as="select">
          <option value="">Select nationality:</option>
          {nationalities.map((nationality) => {
            return (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            )
          })}
        </Field>
        <ErrorMessage
          name="nationality"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="place_of_birth" className="label-modal">
          Place of Birth
        </label>
        <Field
          className="input-text-modal"
          name="place_of_birth"
          type="text"
          id="place_of_birth"
          placeholder="Enter Place of Birth..."
        />
        <ErrorMessage
          name="place_of_birth"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="mother_maiden_name" className="label-modal">
          Mother's Maiden Name
        </label>
        <Field
          className="input-text-modal"
          name="mother_maiden_name"
          type="text"
          id="mother_maiden_name"
          placeholder="Enter Mother's Maiden Name..."
        />
        <ErrorMessage
          name="mother_maiden_name"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
    </>
  );
};

const ContactInfo: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="email" className="label-modal">
          Email
        </label>
        <Field
          className="input-text-modal"
          name="email"
          type="email"
          id="email"
          placeholder="Enter Email..."
        />
        <ErrorMessage
          name="email"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="address" className="label-modal">
          Address
        </label>
        <Field
          className="input-text-modal"
          name="address"
          type="text"
          id="address"
          placeholder="Enter Address..."
        />
        <ErrorMessage
          name="address"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="region" className="label-modal">
          Region
        </label>
        <Field
          className="input-text-modal"
          name="region"
          id="region"
          as="select">
          <option value="">Select region:</option>
          {regionsPH.map((region) => {
            return (
              <option key={region} value={region}>
                {region}
              </option>
            );
          })}
        </Field>
        <ErrorMessage
          name="region"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="local_address" className="label-modal">
          Local Home Address
        </label>
        <Field
          className="input-text-modal"
          name="local_address"
          type="text"
          id="local_address"
          placeholder="Enter Local Home Address..."
        />
        <ErrorMessage
          name="local_address"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="local_address_zip" className="label-modal">
          Local Home Address Zip Code
        </label>
        <Field
          className="input-text-modal"
          name="local_address_zip"
          type="number"
          id="local_address_zip"
          placeholder="Enter Local Home Address Zip Code..."
        />
        <ErrorMessage
          name="local_address_zip"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="foreign_address" className="label-modal">
          Foreign Address
        </label>
        <Field
          className="input-text-modal"
          name="foreign_address"
          type="string"
          id="foreign_address"
          placeholder="Enter Foreign Address..."
        />
        <ErrorMessage
          name="foreign_address"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="foreign_address_zip" className="label-modal">
          Foreign Address Zip Code
        </label>
        <Field
          className="input-text-modal"
          name="foreign_address_zip"
          type="number"
          id="foreign_address_zip"
          placeholder="Enter Foreign Address Zip Code..."
        />
        <ErrorMessage
          name="foreign_address_zip"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="rdo_code" className="label-modal">
          RDO Code
        </label>
        <Field
          className="input-text-modal"
          name="rdo_code"
          type="number"
          id="rdo_code"
          placeholder="Enter RDO Code..."
        />
        <ErrorMessage
          name="rdo_code"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="contact_num" className="label-modal">
          Contact Number
        </label>
        <Field
          className="input-text-modal"
          name="contact_num"
          type="text"
          id="contact_num"
          placeholder="Enter Contact Number..."
        />
        <ErrorMessage
          name="contact_num"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
    </>
  );
};

const EmergencyContact: FC = () => {
  return (
    <>
      <div>
        <label htmlFor="contact_person" className="label-modal">
          Contact Person
        </label>
        <Field
          className="input-text-modal"
          name="contact_person"
          type="text"
          id="contact_person"
          placeholder="Enter Contact Person..."
        />
        <ErrorMessage
          name="contact_person"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="relationship" className="label-modal">
          Relationship
        </label>
        <Field
          className="input-text-modal"
          name="relationship"
          id="relationship"
          as="select">
          <option value="">Select relationship:</option>
          {contactRelationship.map((relationship) => {
            return (
              <option key={relationship} value={relationship}>
                {relationship}
              </option>
            )
          })}
        </Field>
        <ErrorMessage
          name="relationship"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="contact_person_num" className="label-modal">
          Contact Person Number
        </label>
        <Field
          className="input-text-modal"
          name="contact_person_num"
          type="text"
          id="contact_person_num"
          placeholder="Enter Contact Person Number..."
        />
        <ErrorMessage
          name="contact_person_num"
          component="div"
          className="mt-1 text-red-500"
        />
      </div>
      <div>
        <label htmlFor="contact_person_address" className="label-modal">
          Contact Person Address
        </label>
        <Field
          className="input-text-modal"
          name="contact_person_address"
          type="text"
          id="contact_person_address"
          placeholder="Enter Contact Person Address..."
        />
        <ErrorMessage
          name="contact_person_address"
          component="div"
          className="mt-1 text-red-500"
        />
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
