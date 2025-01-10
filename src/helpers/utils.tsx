export async function handleResponse(response: { data: any; }) {
  return response.data;
}
export function handleError(error: any) {
  throw error;
}
