import { useMutation } from '@tanstack/react-query';

async function deleteSchedule(scheduleId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `https://yp3.yahshuasolutions.com/api/schedules/schedule/${scheduleId}/`,
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

function useDeleteSchedule() {
  const mutation = useMutation({
    mutationFn: (scheduleId: number) => deleteSchedule(scheduleId)
  });
  return mutation;
}

export default useDeleteSchedule;