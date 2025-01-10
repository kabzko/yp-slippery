import { useMutation } from '@tanstack/react-query';

async function updatedLog(updateLog: any) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateLog),
    };
    const res = await fetch(`https://yp3.yahshuasolutions.com/api/daily-logs/${updateLog.id}`, config);
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

function useUpdateLog() {
  const mutation = useMutation({
    mutationFn: (updateLog: any) => updatedLog(updateLog)
  });
  return mutation;
}

export default useUpdateLog; 