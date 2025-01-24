import { useMutation } from '@tanstack/react-query';

async function addDepartmentData(data: any) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch('/api/departments/', config);
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

function useAddDepartment() {
  const mutation = useMutation({
    mutationFn: (data: any) => addDepartmentData(data)
  });
  return mutation;
}

export default useAddDepartment;