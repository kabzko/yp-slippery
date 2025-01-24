import { useMutation } from '@tanstack/react-query';
import { sectionType } from '../../../../../../helpers/types/setupSchema';


async function updateSection(data: sectionType) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(
      `/api/sections/section/${data.id}/`,
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

function useUpdateSection() {
  const mutation = useMutation({
    mutationFn: (data: sectionType) => updateSection(data)
  });
  return mutation;
}

export default useUpdateSection;