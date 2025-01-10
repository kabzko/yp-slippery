import axios from "axios";

export const getAllAccounts = async () => {
  try {
    const { data } = await axios.get(
      `https://yp3.yahshuasolutions.com/api/timekeeper-account/`
    );
    return data.timekeeper_account ?? [];
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || "Failed to fetch all accounts.";
    throw new Error(message);
  }
};

export const get1to1Accs = async () => {
  try {
    const { data } = await axios.get(
      `https://yp3.yahshuasolutions.com/api/timekeeper-account/one-to-one/`
    );
    return data.timekeeper_account ?? [];
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || "Failed to fetch 1:1 accounts.";
    throw new Error(message);
  }
};

export const get1toManyAccs = async () => {
  try {
    const { data } = await axios.get(
      `https://yp3.yahshuasolutions.com/api/timekeeper-account/one-to-many/`
    );
    return data.timekeeper_account ?? [];
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || "Failed to fetch 1:M accounts.";
    throw new Error(message);
  }
};

export const addAccount = async (employee: any) => {
  const { id, ...rest } = employee;
  try {
    await axios.post(
      "https://yp3.yahshuasolutions.com/api/timekeeper-account/",
      rest
    );
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || "Failed to fetch add account.";
    throw new Error(message);
  }
};

export const updateAccount = async (data: any) => {
  const { id, ...rest } = data;
  // console.log(rest);
  try {
    await axios.patch(
      `https://yp3.yahshuasolutions.com/api/timekeeper-account/account/${id}/`,
      rest
    );
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || "Failed to fetch update account.";
    throw new Error(message);
  }
};

export const deleteAccount = async (id: any) => {
  try {
    await axios.delete(`https://yp3.yahshuasolutions.com/api/timekeeper-account/account/${id}/`);
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || "Failed to fetch delete account.";
    throw new Error(message);
  }
};
