export async function handleResponse(response: any) {
  return response.data;
}
export function handleError(error: any) {
  throw error;
}