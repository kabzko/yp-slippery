import { useMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import CustomToast from '@/components/Toast/CustomToast';

async function logout() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`/next/api/logout/`, config);
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
}

function useLogout() {
  const query = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.custom(() => <CustomToast message={`Successfully logged out.`} type='success' />, {
        duration: 4000,
      });
    },
  });
  return query;
}

export default useLogout;
