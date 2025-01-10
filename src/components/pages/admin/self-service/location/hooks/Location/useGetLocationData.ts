import { useQuery } from '@tanstack/react-query';

async function getLocationData() {
  try {
    const res = await fetch(
      `https://yp3.yahshuasolutions.com/api/locations/`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
          'Content-Type': 'application/json',
        }
      }
    );
    if (!res.ok) {
      throw res.json();
    }
    return res.json();
  } catch (err: any) {
    let errStringify = await err;
    if (Object.prototype.hasOwnProperty.call(errStringify, 'response')) {
      throw errStringify.response.data.message;
    }
    throw errStringify.message;
  }
}

function useGetLocationData(enabled?: boolean) {
  const query = useQuery({
    queryKey: ['locationData'],
    queryFn: () => getLocationData(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 3000,
    enabled: enabled
  });

  return query;
}

export default useGetLocationData;
