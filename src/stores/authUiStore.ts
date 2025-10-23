'use client';

import { create } from 'zustand';

export const LOGIN_STAGES = {
  LOGIN: 'login',
  OTP: 'otp',
  AUTHENTICATED: 'authenticated',
} as const;

export interface IAuthUiState {
  loginStage: (typeof LOGIN_STAGES)[keyof typeof LOGIN_STAGES];
  setLoginStage: (
    stage: (typeof LOGIN_STAGES)[keyof typeof LOGIN_STAGES],
  ) => void;
  reset: () => void;
}

export const useAuthUiStore = create<IAuthUiState>((set) => ({
  loginStage: LOGIN_STAGES.LOGIN,
  setLoginStage: (stage) => {
    set({ loginStage: stage });
  },
  reset: () => {
    set({ loginStage: LOGIN_STAGES.LOGIN });
  },
}));
