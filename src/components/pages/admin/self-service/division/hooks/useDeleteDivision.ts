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
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `https://yp3.yahshuasolutions.com/api/divisions/division/${divisionId}`,
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