import { useQuery } from '@tanstack/react-query'; 
import axios from 'axios';

const fetchTimeData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/get_current_time/');
    return response.data ?? {}; 
  } catch (error) {
    throw new Error('Error fetching time data'); 
  }
}

function useGetTimeData() {
  return useQuery({
    queryKey: ['timeData'],
    queryFn: fetchTimeData,
  });
}

export default useGetTimeData;
