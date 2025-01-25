import { useMutation } from '@tanstack/react-query';
async function updateCompanySetupStatus() {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
      },
    };
    const res = await fetch(`/api/company-setup-status/`, config);
    if (!res.ok) {
      throw res.json();
    }
    return res.json();
  } catch (err: any) {
    let errStringify = await err;
    if (Object.hasOwn(errStringify, 'response')) {
      throw errStringify.response.data.message;
    }
    throw errStringify;
  }
}

function useUpdateCompanySetupStatus() {
  const query = useMutation({
    mutationFn: () => updateCompanySetupStatus(),
  });
  return query;
}

export default useUpdateCompanySetupStatus;
