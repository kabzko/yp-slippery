import { useMutation } from '@tanstack/react-query';

async function addEmployee(newProfile: any) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProfile),
    };
    const res = await fetch('http://localhost:3000/api/employee-profile', config);
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

function useAddProfile() {
  const mutation = useMutation({
    mutationFn: (newProfile: any) => addEmployee(newProfile)
  });
  return mutation;
}

export default useAddProfile;