import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const fetchTimeData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/get_current_time/');
        return response.data ?? {}; 
    } catch (error) {
        throw new Error('Error fetching location data'); 
    }
}

function useGetTimeData() {
    const query = useQuery({
        queryKey: ['timeData'],
        queryFn: () => fetchTimeData(),
    })
    return query
}

export default useGetTimeData