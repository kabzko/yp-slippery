import { progressState } from "@/components/types/index";
import { getItem } from "@/helpers/getLocalStorageItem";

export function saveToLocalStorage(state: progressState) {
  try {
    const serializedState = JSON.stringify(state);
    if (typeof window !== 'undefined') { 
      localStorage.setItem('progress', serializedState);
    }
  } catch (e) {
    console.error(e);
  }
}

export function loadFromLocalStorage(): progressState | undefined {
  return getItem('progress');
}