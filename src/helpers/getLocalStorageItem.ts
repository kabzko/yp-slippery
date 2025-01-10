export const getItem = (item: string) => {
  try {
    if (typeof window !== 'undefined') { 
      const serializedState = localStorage.getItem(item);
      if (serializedState === null) return undefined;
			// console.log(serializedState)
      return JSON.parse(serializedState);
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
}