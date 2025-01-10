import { useQuery } from '@tanstack/react-query';

async function getSectionData(current_page: number, limit: number) {
  try {
    const res = await fetch(
      `https://yp3.yahshuasolutions.com/api/sections/?current_page=${current_page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
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

function useGetSectionData(current_page: number, limit: number) {
  const query = useQuery({
    queryKey: ['sectionData', current_page, limit],
    queryFn: () => getSectionData(current_page, limit),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 3000
  });

  return query;
}

export default useGetSectionData;