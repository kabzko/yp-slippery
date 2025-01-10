import { useMutation  } from '@tanstack/react-query';
import axios from 'axios'

const createPositionWizard = async (newPositionData: any) => {
    try {
        const config = {
            headers: {
                Authorization: "Token 486828ecf1f5dbe0aa856f8e957283cdd381cada"
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/settings/companies/position/create_wizard/', newPositionData, config);
        return response.data ?? null;
    } catch (error) {
        throw new Error('Error creating location data');
    }
}

function useCreatePositionWizard() {
    const mutation = useMutation({
        mutationKey: ["newPositionData"],
        mutationFn: ((newPositionData) => createPositionWizard(newPositionData))
    })
    
    return mutation;
}

export default useCreatePositionWizard