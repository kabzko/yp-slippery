import { useMutation } from '@tanstack/react-query';

async function deletePosition(positionId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`https://yp3.yahshuasolutions.com/api/positions/position/${positionId}/`, config);
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

function useDeletePosition() {
  const mutation = useMutation({
    mutationFn: (departmentId: number) => deletePosition(departmentId)
  });
  return mutation;
}

export default useDeletePosition;