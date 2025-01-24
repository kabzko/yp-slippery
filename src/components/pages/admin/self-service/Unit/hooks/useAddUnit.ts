import { useMutation } from '@tanstack/react-query';
import { unitType } from '../../../../../../helpers/types/setupSchema';

async function addUnit(data: unitType) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch('/api/units/', config);
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

function useAddUnit() {
  const mutation = useMutation({
    mutationFn: (data: unitType) => addUnit(data)
  });
  return mutation;
}

export default useAddUnit; 