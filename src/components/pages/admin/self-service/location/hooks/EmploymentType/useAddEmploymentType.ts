import { useMutation } from '@tanstack/react-query';

async function addEmploymentType(data: any) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch('/api/employement-types/', config);
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

function useAddEmploymentType() {
  const mutation = useMutation({
    mutationFn: (data: any) => addEmploymentType(data)
  });
  return mutation;
}

export default useAddEmploymentType;