import { useMutation } from '@tanstack/react-query';

async function addStatutory(data: any) {
  try {
    // Check if we have hourly or monthly data
    const isHourly = data.hasOwnProperty('daysPerMonth') || data.hasOwnProperty('hoursPerDay');

    // Transform the data to match backend expectations
    const transformedData = {
      // Monthly Settings
      monthly_enabled: !isHourly,
      sss_type_monthly: data.SSSTypeMonthly || '',
      philhealth_type_monthly: data.PHILHEALTHTypeMonthly || '',
      pagibig_type_monthly: data.PAGIBIGTypeMonthly || '',
      sss_apply_monthly: data.SSSApplyMonthly || 'NOT APPLIED',
      philhealth_apply_monthly: data.PHILHEALTHApplyMonthly || 'NOT APPLIED',
      pagibig_apply_monthly: data.PAGIBIGApplyMonthly || 'NOT APPLIED',
      sss_min_reduction_monthly: parseFloat(data.SSSMinReductionMonthly) || 0,
      philhealth_min_reduction_monthly: parseFloat(data.PHILHEALTHMinReductionMonthly) || 0,
      pagibig_min_reduction_monthly: parseFloat(data.PAGIBIGMinReductionMonthly) || 0,
      
      // Hourly Settings
      hourly_enabled: isHourly,
      days_per_month: parseInt(data.daysPerMonth) || 0,
      hours_per_day: parseInt(data.hoursPerDay) || 0,
      sss_type_hourly: data.SSSTypeHourly || '',
      philhealth_type_hourly: data.PHILHEALTHTypeHourly || '',
      pagibig_type_hourly: data.PAGIBIGTypeHourly || '',
      sss_apply_hourly: data.SSSApplyHourly || 'NOT APPLIED',
      philhealth_apply_hourly: data.PHILHEALTHApplyHourly || 'NOT APPLIED',
      pagibig_apply_hourly: data.PAGIBIGApplyHourly || 'NOT APPLIED',
      sss_min_reduction_hourly: parseFloat(data.SSSMinReductionHourly) || 0,
      philhealth_min_reduction_hourly: parseFloat(data.PHILHEALTHMinReductionHourly) || 0,
      pagibig_min_reduction_hourly: parseFloat(data.PAGIBIGMinReductionHourly) || 0
    };

    console.log('Form data received:', data);
    console.log('Sending statutory data:', transformedData);

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    };
    const res = await fetch('http://localhost:3000/api/statutory', config);
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Server error response:', errorData);
      throw errorData;
    }
    
    const responseData = await res.json();
    console.log('Server response:', responseData);
    return responseData;
  } catch (err: any) {
    console.error('Error in addStatutory:', err);
    if (err.response) {
      throw err.response.data.message;
    }
    throw err.message;
  }
}

function useAddStatutory() {
  const mutation = useMutation({
    mutationFn: (data: any) => addStatutory(data)
  });
  return mutation;
}

export default useAddStatutory;