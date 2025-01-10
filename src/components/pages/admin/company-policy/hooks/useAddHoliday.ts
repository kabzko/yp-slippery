import { useMutation } from '@tanstack/react-query';

async function addHoliday(data: any) {
  try {
    const transformedData = {
      no_holiday_pay_before_enabled: data.no_holiday_pay_before_enabled || false,
      days_absent: parseInt(data.daysAbsent) || 0,
      job_levels: data.jobLevel ? data.jobLevel.map((level: any) => level.value) : [],
      leave_prior_to_holiday_enabled: data.leavePriorToHoliday || false,

      no_holiday_pay_after_enabled: data.no_holiday_pay_after_enabled || false,
      days_absent_employment: parseInt(data.daysAbsentEmployment) || 0,
      employment_types: data.employmentType ? data.employmentType.map((type: any) => type.value) : [],

      no_work_no_pay_enabled: data.no_work_no_pay_enabled || false,

      holiday_on_rest_day_enabled: data.holiday_on_rest_day_enabled || false,
      days_absent_holiday: parseInt(data.daysAbsentHoliday) || 0,
      holiday_types: data.holidayType ? data.holidayType.map((type: any) => type.value) : []
    };

    console.log('Transformed holiday data:', transformedData);

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    };
    const res = await fetch('http://localhost:3000/api/holiday', config);
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Server error response:', errorData);
      throw errorData;
    }
    
    const responseData = await res.json();
    console.log('Server response:', responseData);
    return responseData;
  } catch (err: any) {
    console.error('Error in addHoliday:', err);
    if (err.response) {
      throw err.response.data.message;
    }
    throw err.message;
  }
}

function useAddHoliday() {
  const mutation = useMutation({
    mutationFn: (data: any) => addHoliday(data)
  });
  return mutation;
}

export default useAddHoliday;