'use client';

import { create } from 'zustand';

export interface IAuthUiState {
  loginStage: 'login' | 'otp';
  setLoginStage: (stage: 'login' | 'otp') => void;
  reset: () => void;
}

export const useAuthUiStore = create<IAuthUiState>((set) => ({
  loginStage: 'login',
  setLoginStage: (stage) => {
    set({ loginStage: stage });
  },
  reset: () => {
    set({ loginStage: 'login' });
  },
}));


