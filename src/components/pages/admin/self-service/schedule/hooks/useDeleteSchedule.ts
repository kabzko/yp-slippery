import { useMutation } from '@tanstack/react-query';

async function deleteSchedule(scheduleId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/schedules/schedule/${scheduleId}`,
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