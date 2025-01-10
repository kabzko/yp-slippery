import axios from 'axios';

export const fetchStatutoryPolicy = async () => {
  try {
    const { data } = await axios.get('https://yp3.yahshuasoutions.com/api/company-policy/statutory');
    return data.statutory ?? {};
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to fetch statutory policy.';
    throw new Error(message);
  }
};

export const fetchTaxPolicy = async () => {
  try {
    const { data } = await axios.get('https://yp3.yahshuasoutions.com/api/company-policy/tax');
    return data.tax ?? {};
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to fetch tax policy.';
    throw new Error(message);
  }
};

export const fetchHolidayPolicy = async () => {
  try {
    const { data } = await axios.get('https://yp3.yahshuasoutions.com/api/company-policy/holiday');
    return data.holiday ?? {};
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to fetch holiday policy.';
    throw new Error(message);
  }
};

