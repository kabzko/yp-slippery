import { useMutation } from '@tanstack/react-query';
import { industryType } from '../../../../../helpers/types/industryTypes';

async function addIndustry(data: industryType) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`/api/industry/`, config);
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

function useAddCompanyIndustry() {
  const mutation = useMutation({
    mutationFn: (data: industryType) => addIndustry(data),
  });
  return mutation;
}

export default useAddCompanyIndustry;
