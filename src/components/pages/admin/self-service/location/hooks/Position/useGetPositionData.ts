import { useQuery } from '@tanstack/react-query';

async function fetchPositionsData() {
    try {
        const res = await fetch(
            `/api/positions/`,
            {
                method: 'GET',
                headers: {
                    'X-CSRFToken': (document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement)?.defaultValue,
                    'content-type': 'application/json',
                }
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

function useGetPositionData(enabled?: boolean) {
    const query = useQuery({
        queryKey: ['positionsData'],
        queryFn: () => fetchPositionsData(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
        retryDelay: 3000,
        enabled: enabled
    });

    return query;
}

export default useGetPositionData;