import { useMutation } from '@tanstack/react-query';

interface DepartmentData {
  id: string;
  name: string;
}

async function updateDepartmentData(data: DepartmentData) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`https://yp3.yahshuasolutions.com/api/departments/department/${data.id}`, config);
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

function useUpdateDepartment() {
  const mutation = useMutation({
    mutationFn: (data: DepartmentData) => updateDepartmentData(data)
  });
  return mutation;
}

export default useUpdateDepartment;