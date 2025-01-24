import { useQuery } from '@tanstack/react-query';

const fetchTimeData = async () => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    };
    const response = await fetch('/get_current_time/', config);
    if (!response.ok) {
      throw response.json();
    }
    const data = await response.json();
    return data ?? {};
  } catch (error) {
    throw error;
  }
};

function useGetTimeData() {
  return useQuery({
    queryKey: ['timeData'],
    queryFn: fetchTimeData,
  });
}

export default useGetTimeData;
