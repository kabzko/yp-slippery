import { useMutation } from '@tanstack/react-query';

interface EmploymentTypeData {
  id: string;
  name: string;
}

async function updateEmploymentType(data: EmploymentTypeData) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(
      `https://yp3.yahshuasolutions.com/api/employement-types/employement-type/${data.id}/`,
      config
    );
    
    const responseData = await res.json();
    
    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to update employment type');
    }
    
    return responseData;
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'Failed to update employment type');
  }
}

function useUpdateEmploymentType() {
  const mutation = useMutation({
    mutationFn: (data: any) => updateEmploymentType(data)
  });
  return mutation;
}

export default useUpdateEmploymentType;