import { useMutation } from '@tanstack/react-query';
import { locationType } from '@/helpers/types/setupSchema';

async function updateLocation(data: locationType) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(
      `/api/locations/location/${data.id}/`,
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