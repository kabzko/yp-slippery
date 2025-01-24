import { useMutation } from '@tanstack/react-query';

async function deleteLocation(locationId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `/api/locations/location/${locationId}/`,
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

function useDeleteLocation() {
  const mutation = useMutation({
    mutationFn: (locationId: number) => deleteLocation(locationId)
  });
  return mutation;
}

export default useDeleteLocation; 