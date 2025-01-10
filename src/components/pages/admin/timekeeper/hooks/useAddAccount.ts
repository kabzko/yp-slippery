import { useMutation } from '@tanstack/react-query';

async function addAccount(employee: any) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    };
    const res = await fetch('http://localhost:3000/api/timekeeper-account', config);
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

function useAddAccount() {
  const mutation = useMutation({
    mutationFn: (employee: any) => addAccount(employee)
  });
  return mutation;
}

export default useAddAccount;