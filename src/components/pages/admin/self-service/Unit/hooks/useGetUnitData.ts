import { useQuery } from '@tanstack/react-query';

async function getUnitsData(current_page: number, limit: number) {
  try {
    const res = await fetch(
      `/api/units/?current_page=${current_page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
          'content-type': 'application/json',
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

function useGetUnitsData(current_page: number, limit: number, enabled?: boolean) {
  const query = useQuery({
    queryKey: ['unitsData', current_page, limit],
    queryFn: () => getUnitsData(current_page, limit),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 3000,
    enabled
  });

  return query;
}

export default useGetUnitsData;