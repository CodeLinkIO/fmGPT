import { StoreSlice } from './store';

export interface DebugSlice {
  isDebugEnabled: boolean;
  setIsDebugEnabled: (isDebugEnabled: boolean) => void;
}

export const createDebugSlice: StoreSlice<DebugSlice> = (set, get) => ({
  isDebugEnabled: import.meta.env.VITE_DEBUG_MODE === 'true',
  setIsDebugEnabled: (isDebugEnabled: boolean) =>
    set(() => ({ isDebugEnabled })),
});
