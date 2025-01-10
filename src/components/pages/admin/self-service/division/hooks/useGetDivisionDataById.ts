import { useQuery } from '@tanstack/react-query';

async function getDivisionDataById(id: number) {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`https://yp3.yahshuasolutions.com/api/divisions/division/${id}`, config);
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