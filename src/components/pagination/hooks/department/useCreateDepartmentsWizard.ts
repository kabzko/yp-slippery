import { useMutation  } from '@tanstack/react-query';
import axios from 'axios'

const createDepartmentWizard = async (newDepartmentData: any) => {
    try {
        const config = {
            headers: {
                Authorization: "Token 486828ecf1f5dbe0aa856f8e957283cdd381cada"
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/settings/companies/departments/create_wizard/', newDepartmentData, config);
        return response.data ?? null;
    } catch (error) {
        throw new Error('Error creating location data');
    }
}

function useCreateDepartmentWizard() {
    const mutation = useMutation({
        mutationKey: ["newDepartmentData"],
        mutationFn: ((newDepartmentData) => createDepartmentWizard(newDepartmentData))
    })
    
    return mutation;
}

export default useCreateDepartmentWizard