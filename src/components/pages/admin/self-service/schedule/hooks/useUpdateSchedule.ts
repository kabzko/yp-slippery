import { useMutation } from '@tanstack/react-query';

interface UpdateScheduleData {
  id: number;
  old_name: string;
  timein: string;
  timeout: string;
  workhours: number;
  flexible_time: boolean;
  workdays: number[];
  breakhours: number;
  break_type: string;
}

async function updateSchedule({ id, ...data }: UpdateScheduleData) {
  try {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/schedules/schedule/${id}`,
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

function useUpdateSchedule() {
  const mutation = useMutation({
    mutationFn: (data: any) => updateSchedule(data)
  });

  return mutation;
}

export default useUpdateSchedule;