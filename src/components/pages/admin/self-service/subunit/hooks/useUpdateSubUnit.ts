import { useMutation } from '@tanstack/react-query';
import { subUnitType } from '../../../../../../helpers/types/setupSchema';

async function updateSubUnit(data: subUnitType) {
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
      `/api/sub-units/sub-unit/${data.id}/`,
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

function useUpdateSubUnit() {
  const mutation = useMutation({
    mutationFn: (data: subUnitType) => updateSubUnit(data)
  });
  return mutation;
}

export default useUpdateSubUnit; 
