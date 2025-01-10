import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomToast from '../../../../Toast/CustomToast';
import toast from 'react-hot-toast';
import axios from 'axios';

const apiClient = axios.create({
	baseURL: (`/api/timekeeper-account/`),
});


const updateAccount = async (data: any) => {
	const { id, ...rest } = data;
	const response = await axios.patch(`https://yp3.yahshuasolutions.com/api/timekeeper-account/account/${id}`, rest);
	return response.data;
}


export function useUpdateAccount(queryKey: string[]) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateAccount,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
			toast.custom(() => <CustomToast message={`Successfully updated account.`} type='success' />, {
				duration: 4000
			});
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey });
			toast.custom(() => <CustomToast message={`Failed to fetch update account.`} type='error' />, {
				duration: 4000
			});
		}
	});
}