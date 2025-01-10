import { useMutation } from '@tanstack/react-query';

const addEmployeesfromCSV = async (file: File) => {
  const url = "https://yp3.yahshuasolutions.com/api/employee-profile/import-csv";
  let formData = new FormData();
  formData.append("file", file);

try {
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Failed to upload file: ${errorDetails}`);
  }

  return response.json();  
} catch (error) {
  console.error("Error during file upload:", error);
  throw error;
}
};

function useImportFile() {
const mutation = useMutation({
  mutationFn: (file: File) => addEmployeesfromCSV(file)
});
return mutation;
}

export default useImportFile;