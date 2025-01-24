import { useMutation } from '@tanstack/react-query';

async function deleteUnit(unitId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`/api/units/unit/${unitId}/`, config);
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

function useDeleteUnit() {
  const mutation = useMutation({
    mutationFn: (unitId: number) => deleteUnit(unitId)
  });
  return mutation;
}

export default useDeleteUnit; 