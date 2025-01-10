import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import CustomToast from '../../../../Toast/CustomToast';
import axios from 'axios';

const apiClient = axios.create({
	baseURL: (`/api/employee-profile/`),
});


const addEmployeesfromCSV = async (file: File) => {
	const url = "https://yp3.yahshuasolutions.com/api/employee-profile/import-csv/";
  let formData = new FormData();
  formData.append("file", file);

	const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
	return response.data;
}


export function useImportFile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addEmployeesfromCSV,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['employees'] })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] });
			toast.custom(() => <CustomToast message={`Successfully imported employee(s).`} type='success' />, {
				duration: 4000
			})
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] });
			toast.custom(() => <CustomToast message={`Failed to import employee(s).`} type='error' />, {
				duration: 4000
			})
		}
	})
}