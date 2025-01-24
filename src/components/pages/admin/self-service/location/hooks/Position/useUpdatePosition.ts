import { useMutation } from '@tanstack/react-query';
import { positionType } from '@/helpers/types/setupSchema';

async function updatePosition(data: positionType) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`/api/positions/position/${data.id}/`, config);
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

function useUpdatePosition() {
  const mutation = useMutation({
    mutationFn: (data: any) => updatePosition(data)
  });
  return mutation;
}
export default useUpdatePosition;
