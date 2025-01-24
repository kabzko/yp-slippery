import { useMutation } from '@tanstack/react-query';

async function addScheduleData(data: any) {
  try {
    const res = await fetch(
      `https://yp3.yahshuasolutions.com/api/schedules/`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'token 9c031f9de0e7fe7cf1bbd63062b007d07bb92319',
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