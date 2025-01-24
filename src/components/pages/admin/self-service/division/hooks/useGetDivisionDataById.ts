import { useQuery } from '@tanstack/react-query';

async function getDivisionDataById(id: number) {
  try {
    const config = {
      method: 'GET',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`/api/divisions/division/${id}`, config);
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

function useDivisionDataById(id: number) {
  const query = useQuery({
    queryKey: ['divisionData', id],
    queryFn: () => getDivisionDataById(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 3000
  });

  return query;
}

export default useDivisionDataById; 