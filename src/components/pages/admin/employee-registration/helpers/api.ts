import axios from "axios";

export const getProfiles = async () => {
  try {
    const { data } = await axios.get(`https://yp3.yahshuasolutions.com/api/employee-profile/`);
    return data.employee_profile ?? [];
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to fetch employees.';
    throw new Error(message);
  }
};

export const addEmployeesfromCSV = async (file: File) => {
  const url = "https://yp3.yahshuasolutions.com/api/employee-profile/import-csv/";
  let formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to import employee(s).';
    throw new Error(message);
  }
};

export const addEmployee = async (employee: any) => {
  try {
    await axios.post("https://yp3.yahshuasolutions.com/api/employee-profile/",employee);
  } catch (error: any) {
    // console.error(error?.response?.data, error?.response?.data?.message, error?.message);
    const message = error?.message || error?.response?.data?.message || 'Failed to create employee.';
    throw new Error(message);
  }
};

export const deleteProfile = async (id: any) => {
  try {
    await axios.delete(
      `https://yp3.yahshuasolutions.com/api/employee-profile/profile/${id}`
    );
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to delete employee.';
    throw new Error(message);
  }
};

export const updateProfile = async (updatedEmployee: any) => {
  const { id, ...rest } = updatedEmployee;
  try {
    await axios.patch(`https://yp3.yahshuasolutions.com/api/employee-profile/profile/${id}`,rest);
  } catch (error: any) {
    console.log(error, error?.message, typeof error.message);
    const message = error.message || error?.response?.data?.message || 'Failed to update employee.';
    throw new Error(message);
    // return error.message;
  }
};

export const updateJob = async (updatedJob: any) => {
  try {
    await axios.post(
      `https://yp3.yahshuasolutions.com/api/job-profile/`,
      updatedJob
    );
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || "Failed to update employee's job information.";
    throw new Error(message);
  }
};