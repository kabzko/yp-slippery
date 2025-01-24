import { useQuery } from '@tanstack/react-query';

async function getDepartmentData() {
  try {
    const res = await fetch(
      `/api/departments/`,
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

function useGetDepartmentData(enabled?: boolean) {
  const query = useQuery({
    queryKey: ['departmentData'],
    queryFn: () => getDepartmentData(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 3000,
    enabled: enabled
  });

  return query;
}

export default useGetDepartmentData;

