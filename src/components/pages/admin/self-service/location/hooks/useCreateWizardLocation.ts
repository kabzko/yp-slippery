import { useMutation  } from '@tanstack/react-query';
import axios from 'axios'

const createLocationWizard = async (newLocationData: any) => {
    try {
        const config = {
            headers: {
                Authorization: "Token 486828ecf1f5dbe0aa856f8e957283cdd381cada"
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/settings/companies/locations/create_wizard/', newLocationData, config);
        return response.data ?? null;
    } catch (error) {
        throw new Error('Error creating location data');
    }
}

function useCreateLocationWizard() {
    // const mutation = useMutation((newLocationData) => createLocationWizard(newLocationData));
    const mutation = useMutation({
        mutationKey: ["newLocationData"],
        mutationFn: ((newLocationData) => createLocationWizard(newLocationData))
    })
    
    return mutation;
}

export default useCreateLocationWizard