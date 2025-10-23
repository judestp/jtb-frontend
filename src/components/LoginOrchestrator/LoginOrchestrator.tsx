'use client';

import { useCallback } from 'react';
import type { JSX } from 'react';
import Login from '@/components/Login/LoginForm.tsx';
import OtpVerification from '@/components/OtpVerification/OtpVerification.tsx';
import { useAuthUiStore } from '@/stores/authUiStore.ts';

export interface ILoginOrchestratorProps {
  className?: string;
  onAuthenticated?: () => void;
}

export default function SignInWithOtp({
  className,
  onAuthenticated,
}: ILoginOrchestratorProps): JSX.Element {
  const stage = useAuthUiStore((s) => s.loginStage);
  const setStage = useAuthUiStore((s) => s.setLoginStage);

  const handleLoginSuccess = useCallback((): void => {
    setStage('otp');
  }, [setStage]);

  const handleOtpVerified = useCallback((): void => {
    if (typeof onAuthenticated === 'function') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  if (stage === 'login') {
    return (
      <Login
        className={className}
        onLogin={() => {
          handleLoginSuccess();
        }}
      />
    );
  }

  return (
    <OtpVerification className={className} onVerified={handleOtpVerified} />
  );
}
