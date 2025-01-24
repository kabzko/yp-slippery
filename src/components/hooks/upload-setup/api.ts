export const uploadSetupData = async (file: File | null, url: string) => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  try {
    const config = {
      method: 'POST',
      body: formData,
    };
    const res = await fetch(url, config);
    if (!res.ok) {
      throw res.json();
    }
    return res.json();
  } catch (err: any) {
    let errStringify = await err;
    if (Object.hasOwn(errStringify, 'response')) {
      throw errStringify.response.data.message;
    }
    throw errStringify;
  }
};

export const uploadScheduleData = async (file: File | null, url: string, data: any) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(url, config);
    if (!res.ok) {
      throw res.json();
    }
    return res.json();
  } catch (err: any) {
    let errStringify = await err;
    if (Object.hasOwn(errStringify, 'response')) {
      throw errStringify.response.data.message;
    }
    throw errStringify;
  }
};
