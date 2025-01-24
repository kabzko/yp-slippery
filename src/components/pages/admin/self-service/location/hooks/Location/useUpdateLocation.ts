import { useMutation } from '@tanstack/react-query';
import { locationType } from '@/helpers/types/setupSchema';

async function updateLocation(data: locationType) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(
      `https://yp3.yahshuasolutions.com/api/locations/location/${data.id}/`,
      config
    );
    if (!res.ok) {
      throw await res.json();
    }
    return res.json();
  } catch (err: any) {
    if (err.response) {
      throw err.response.data.message;
    }
    throw err.message;
  }
}

function useUpdateLocation() {
  const mutation = useMutation({
    mutationFn: (data: locationType) => updateLocation(data)
  });
  return mutation;
}

export default useUpdateLocation; 