import { useMutation } from '@tanstack/react-query';

async function deleteAccount(id: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`http://localhost:3000/api/timekeeper-account/account/${id}`, config);
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

function useDeleteAccount() {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteAccount(id)
  });
  return mutation;
}

export default useDeleteAccount;