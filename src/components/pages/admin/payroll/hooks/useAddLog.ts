import { useMutation } from '@tanstack/react-query';

async function addLog(newLog: any) {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLog),
    };
    const res = await fetch('http://localhost:3000/api/daily-logs', config);
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

function useAddLog() {
  const mutation = useMutation({
    mutationFn: (newLog: any) => addLog(newLog)
  });
  return mutation;
}

export default useAddLog;