import axios from 'axios';

export const getEmployees = async () => {
  try {
    const { data } = await axios.get(`https://yp3.yahshuasoutions.com/api/employee/`);
    const employeeData = data.employee ?? [];
    // console.log(employeeData)
    return employeeData;
    // const fullNames = employeeData.map((employee: any) => `${employee.firstname} ${employee.lastname}`);
    // return fullNames;
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to fetch employees.';
    throw new Error(message);
  }
};

export const getLogs = async () => {
  try {
    const { data } = await axios.get(`https://yp3.yahshuasolutions.com/api/daily-logs/`);
    return data.daily_logs ?? [];
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to fetch logs.';
    throw new Error(message);
  }
}

export const editLog = async (id: any) => {
  try {
    await axios.patch(`https://yp3.yahshuasolutions.com/api/daily-logs/logs/${id}`);
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to edit log.';
    throw new Error(message);
  }
};

export const deleteLog = async (id: any) => {
  try {
    await axios.delete(`https://yp3.yahshuasolutions.com/api/daily-logs/logs/${id}`);
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to delete log.';
    throw new Error(message);
  }
};

export const addLogsfromCSV = async (file: File) => {
  const url = "https://yp3.yahshuasolutions.com/api/daily-logs/csv/";
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
    const message = error?.message || error?.response?.data?.message || 'Failed to import logs(s).';
    throw new Error(message);
  }
};