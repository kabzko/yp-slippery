import { useMutation } from '@tanstack/react-query';

async function updateAccount(data: any) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`https://yp3.yahshuasolutions.com/api/timekeeper-account/account/${data.id}`, config);
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

function useUpdateAccount() {
  const mutation = useMutation({
    mutationFn: (data: any) => updateAccount(data)
  });
  return mutation;
}

export default useUpdateAccount; 