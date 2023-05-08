import { StoreSlice } from './store';

export interface AuthSlice {
  firstVisit: boolean;
  setFirstVisit: (firstVisit: boolean) => void;
}

export const createAuthSlice: StoreSlice<AuthSlice> = (set, get) => ({
  firstVisit: true,
  setFirstVisit: (firstVisit: boolean) => {
    set((prev: AuthSlice) => ({
      ...prev,
      firstVisit: firstVisit,
    }));
  },
});
