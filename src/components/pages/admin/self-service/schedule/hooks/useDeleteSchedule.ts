import { useMutation } from '@tanstack/react-query';

async function deleteSchedule(scheduleId: number) {
  try {
    const config = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(
      `/api/schedules/schedule/${scheduleId}/`,
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