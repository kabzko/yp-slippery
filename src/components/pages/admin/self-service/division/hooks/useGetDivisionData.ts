import { useQuery } from '@tanstack/react-query';

async function getDivisionData(current_page: number, limit: number) {
  try {
    const url = `https://yp3.yahshuasolutions.com/api/divisions/?current_page=${current_page}&limit=${limit}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    return res.json();
  } catch (err: any) {
    if (err?.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'An unexpected error occurred');
  }
}

function useGetDivisionData(current_page: number, limit: number) {
  const query = useQuery({
    queryKey: ['divisionData', current_page, limit],
    queryFn: () => getDivisionData(current_page, limit),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 3000,
  });

  return query;
}

export default useGetDivisionData;
