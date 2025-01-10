import * as Yup from "yup";
import { nationalities, regionsPH, contactRelationship } from "./constants";

import { Employee, JobProfile } from '../../../../types';

export const initialEmployeeProfileValues: Employee = {
  first_name: "",
  last_name: "",
  middle_name: "",
  extension: "",
  gender: "",
  birthday: "",
  civil_status: "",
  nationality: "",
  place_of_birth: "",
  mother_maiden_name: "", //
  email: "",
  address: "",
  region: "",
  local_address: "",
  local_address_zip: 0,
  foreign_address: "",
  foreign_address_zip: 0,
  rdo_code: "", //
  contact_num: "",
  contact_person: "",
  relationship: "",
  contact_person_num: "",
  contact_person_address: ""
};

export const initialJobProfileValues: JobProfile = {
  employment_type: "",
  date_hired: "",
  schedule: "",
  rate_status: "",
  department: "",
  position: "",
  hrs_per_day: 0,
  basic_salary: 0, // 500.00
  days_per_mos: 0,
  confidential_level: "",
  salary_effective_date: "",
  location: "",
};

export const employeeProfileSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required*").matches(/^[a-zA-Z .-]*$/, "Invalid first name.*"),
  last_name: Yup.string().required("Last name is required*").matches(/^[a-zA-Z .-]*$/, "Invalid last name.*"),
  middle_name: Yup.string().matches(/^[a-zA-Z .-]*$/, "Invalid middle name.*"),
  extension: Yup.string(),
  gender: Yup.string().required("Gender is required*").oneOf(["F", "M", "Other"]),
  birthday: Yup.date().required("Birthday is required*").max(new Date(), "Invalid birth date.*").min(new Date(1890, 0, 1), "Invalid birth date.*"),
  civilStatus: Yup.string().required("Civil status is required*").oneOf(["Single", "Married", "Divorced", "Separated", "Widowed", "Other"]),
  nationality: Yup.string().required("Nationality is required*").oneOf(nationalities),
  place_of_birth: Yup.string().required("Birth place is required*"),
  mother_maiden_name: Yup.string().required("Mother's maiden name is required*").matches(/^[a-zA-Z .-]*$/),
  email: Yup.string().email("Invalid email address").required("Email is required*"),
  address: Yup.string().required("Address is required*"),
  region: Yup.string().required("Region is required*").oneOf(regionsPH),
  local_address: Yup.string().required("Local home address is required*"),
  local_address_zip: Yup.number().required("Local home address zip code is required*"),
  foreign_address: Yup.string(),
  foreign_address_zip: Yup.number(),
  rdo_code: Yup.number(),
  contact_num: Yup.string().required("Contact number is required*"),
  contact_person: Yup.string().required("Contact person is required*").matches(/^[a-zA-Z .-]*$/, "Invalid contact person.*"),
  relationship: Yup.string().required("Relationship is required*").oneOf(contactRelationship),
  contact_person_num: Yup.string().required("Contact person's number is required*"),
  contact_person_address: Yup.string().required("Contact person's address is required*"),
});

export const updateEmpProfileSchema = Yup.object().shape({
  first_name: Yup.string().matches(/^[a-zA-Z .-]*$/, "Invalid first name.*").required("First name is required*"),
  last_name: Yup.string().matches(/^[a-zA-Z .-]*$/, "Invalid last name.*").required("Last name is required*"),
  middle_name: Yup.string().matches(/^[a-zA-Z .-]*$/, "Invalid middle name.*"),
  extension: Yup.string(),
  gender: Yup.string().oneOf(["F", "M", "Other"]),
  birthday: Yup.date().max(new Date(), "Invalid birth date.*").min(new Date(1890, 0, 1), "Invalid birth date.*"),
  civilStatus: Yup.string().oneOf(["Single", "Married", "Divorced", "Separated", "Widowed", "Other"]),
  nationality: Yup.string().oneOf(nationalities),
  place_of_birth: Yup.string(),
  mother_maiden_name: Yup.string().matches(/^[a-zA-Z .-]*$/),
  email: Yup.string().email("Invalid email address").required("Email is required*"),
  address: Yup.string(),
  region: Yup.string().oneOf(regionsPH),
  local_address: Yup.string(),
  local_address_zip: Yup.number(),
  foreign_address: Yup.string(),
  foreign_address_zip: Yup.number(),
  rdo_code: Yup.number(),
  contact_num: Yup.string(),
  contact_person: Yup.string().matches(/^[a-zA-Z .-]*$/, "Invalid contact person.*"),
  relationship: Yup.string().oneOf(contactRelationship),
  contact_person_num: Yup.string(),
  contact_person_address: Yup.string(),
});

export function hasAllProperties(obj: any, model: any): boolean {
  for (let key in model) {
    if (!(key in obj) || obj[key] === null) {
      return false;
    }
    if (
      typeof model[key] === "object" &&
      !hasAllProperties(obj[key], model[key])
    ) {
      return false;
    }
  }
  return true;
}

export const incompleteEmployeeProfile = {
  first_name: null,
  last_name: null,
  // middle_name: "",
  // extension: "",
  gender: null,
  birthday: null,
  civilStatus: null,
  nationality: null,
  place_of_birth: null,
  mother_maiden_name: null,
  email: null,
  address: null,
  region: null,
  local_address: null,
  local_address_zip: null,
  // foreign_address: "",
  // foreign_address_zip: 0,
  // rdo_code: "",
  contact_num: null,
  contact_person: null,
  relationship: null,
  contact_person_num: null,
  contact_person_address: null,
};

export const incompleteEmployeeJobProfile = {
  employment_type: null,
  date_hired: null,
  schedule: null,
  rate_status: null,
  department: null,
  position: null,
  hrs_per_day: null,
  basic_salary: null, // 500.00
  days_per_mos: null,
  confidential_level: null,
  salary_effective_date: null,
  location: null,
};
