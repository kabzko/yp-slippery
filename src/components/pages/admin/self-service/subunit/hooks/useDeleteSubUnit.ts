import { useMutation } from '@tanstack/react-query';

async function deleteSubUnit(subUnitId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `/api/sub-units/sub-unit/${subUnitId}/`,
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

function useDeleteSubUnit() {
  const mutation = useMutation({
    mutationFn: (subUnitId: number) => deleteSubUnit(subUnitId)
  });
  return mutation;
}

export default useDeleteSubUnit; 
