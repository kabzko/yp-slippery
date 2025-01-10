import { useMutation } from '@tanstack/react-query';

async function updateInfo(data: any) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`https://yp3.yahshuasolutions.com/api/units/unit/${data.id}`, config);
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

function useUpdateInfo() {
  const mutation = useMutation({
    mutationFn: (data: any) => updateInfo(data)
  });
  return mutation;
}

export default useUpdateInfo; 