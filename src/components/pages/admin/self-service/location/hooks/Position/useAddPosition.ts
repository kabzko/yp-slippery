import { useMutation } from '@tanstack/react-query';

async function addPosition(data: any) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch('/api/positions/', config);
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

function useAddPosition() {
  const mutation = useMutation({
    mutationFn: (data: any) => addPosition(data)
  });
  return mutation;
}

export default useAddPosition;