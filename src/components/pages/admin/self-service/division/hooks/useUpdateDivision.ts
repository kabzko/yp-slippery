import { useMutation } from '@tanstack/react-query';
import { divisionType } from '@/helpers/types/setupSchema';

async function updateDivision(data: divisionType) {
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
      `/api/divisions/division/${data.id}/`, config);

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
   
function useUpdateDivision() {
  const mutation = useMutation({
    mutationFn: (data: divisionType) =>updateDivision(data)
  });
  return mutation;
}

export default useUpdateDivision;
