import { useMutation } from '@tanstack/react-query';

async function addTax(data: any) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch('http://localhost:3000/api/tax', config);
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

function useAddTax() {
  const mutation = useMutation({
    mutationFn: (data: any) => addTax(data)
  });
  return mutation;
}

export default useAddTax;