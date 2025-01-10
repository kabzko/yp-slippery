import axios from 'axios'

export const uploadSetupData = async (file: File, url: string) => {
  let formData = new FormData();
  formData.append("file", file);
  try {
    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    const message = error?.message || error?.response?.data?.message || 'Failed to import data.';
    throw new Error(message);
  }
};