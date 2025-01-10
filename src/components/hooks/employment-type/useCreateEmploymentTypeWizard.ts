import { useMutation  } from '@tanstack/react-query';
import axios from 'axios'

const createEmploymentTypeWizard = async (newEmploymentTypeData: any) => {
    try {
        const config = {
            headers: {
                Authorization: "Token 486828ecf1f5dbe0aa856f8e957283cdd381cada"
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/settings/companies/employment_types/create_wizard/', newEmploymentTypeData, config);
        return response.data ?? null;
    } catch (error) {
        throw new Error('Error creating location data');
    }
}

function useEmploymentTypeWizard() {
    const mutation = useMutation({
        mutationKey: ["newEmploymentTypeData"],
        mutationFn: ((newEmploymentTypeData) => createEmploymentTypeWizard(newEmploymentTypeData))
    })
    
    return mutation;
}

export default useEmploymentTypeWizard