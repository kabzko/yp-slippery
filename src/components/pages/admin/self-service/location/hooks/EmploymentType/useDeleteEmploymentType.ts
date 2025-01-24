import { useMutation } from '@tanstack/react-query';

async function deleteEmploymentType(employmentTypeId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`/api/employement-types/employement-type/${employmentTypeId}/`, config);
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

function useDeleteEmploymentType() {
  const mutation = useMutation({
    mutationFn: (departmentId: number) => deleteEmploymentType(departmentId)
  });
  return mutation;
}

export default useDeleteEmploymentType;