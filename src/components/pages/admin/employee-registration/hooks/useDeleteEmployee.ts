import { useMutation } from '@tanstack/react-query';

async function deleteEmployee(id: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`http://localhost:3000/api/employee-profile/${id}`, config);
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

function useDeleteProfile() {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteEmployee(id)
  });
  return mutation;
}

export default useDeleteProfile;