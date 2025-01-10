import { useMutation } from '@tanstack/react-query';
import { subUnitType } from '../../../../../../helpers/types/setupSchema';

async function addSubUnit(data: subUnitType) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`https://yp3.yahshuasolutions.com/api/sub-units/`, config);
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

function useAddSubUnit() {
  const mutation = useMutation({
    mutationFn: (data: subUnitType) => addSubUnit(data)
  });
  return mutation;
}

export default useAddSubUnit; 