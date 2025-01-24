import { useMutation } from '@tanstack/react-query';

async function deleteSection(sectionId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `/api/sections/section/${sectionId}/`,
      config
    );
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

function useDeleteSection() {
  const mutation = useMutation({
    mutationFn: (sectionId: number) => deleteSection(sectionId)
  });
  return mutation;
}

export default useDeleteSection; 