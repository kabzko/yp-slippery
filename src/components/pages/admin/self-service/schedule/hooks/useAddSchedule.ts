import { useMutation } from '@tanstack/react-query';

async function addScheduleData(data: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/schedules/`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data)
      }
    );
    if (!res.ok) {
      throw res.json();
    }
    return res.json();
  } catch (err: any) {
    let errStringify = await err;
    if (Object.prototype.hasOwnProperty.call(errStringify, 'response')) {
      throw errStringify.response.data.message;
    }
    throw errStringify.message;
  }
}

function useAddSchedule() {
  const mutation = useMutation({
    mutationFn: (data: any) => addScheduleData(data)
  });

  return mutation;
}

export default useAddSchedule;