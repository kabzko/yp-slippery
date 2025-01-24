import { useMutation } from '@tanstack/react-query';

interface DeleteDivisionResponse {
  success: boolean;
  message: string;
}

async function deleteDivision(divisionId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `/api/divisions/division/${divisionId}/`,
      config
    );
    
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to delete division');
    }
    return responseData as DeleteDivisionResponse;
  } catch (err: any) {
    throw new Error(err.message || 'An unexpected error occurred');
  }
}

function useDeleteDivision() {
  const mutation = useMutation({
    mutationFn: deleteDivision
  });
  return mutation;
}

export default useDeleteDivision;