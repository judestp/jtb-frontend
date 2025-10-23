'use client';

import { useCallback, useState } from 'react';
import type { JSX } from 'react';
import Login from '@/components/Login/LoginForm.tsx';
import OtpVerification from '@/components/OtpVerification/OtpVerification.tsx';
import { LOGIN_STAGES, useAuthUiStore } from '@/stores/authUiStore.ts';
import UserSearch from '@/components/UserSearch/UserSearch.tsx';
import UnlockPasswordReset from '@/components/UnlockPasswordReset/UnlockPasswordReset.tsx';
import JtbHeader from '@/components/Header/Header.tsx';

export interface ILoginOrchestratorProps {
  className?: string;
  onAuthenticated?: () => void;
}

export default function SignInWithOtp({
  className,
  onAuthenticated,
}: ILoginOrchestratorProps): JSX.Element {
  const { loginStage, setLoginStage } = useAuthUiStore();
  const [authedPage, setAuthedPage] = useState<
    'UserSearch' | 'UnlockPasswordReset'
  >('UserSearch');

  const handleLoginSuccess = useCallback((): void => {
    setLoginStage(LOGIN_STAGES.OTP);
  }, [setLoginStage]);

  const handleOtpVerified = useCallback((): void => {
    setLoginStage(LOGIN_STAGES.AUTHENTICATED);
    if (typeof onAuthenticated === 'function') {
      onAuthenticated();
    }
  }, [onAuthenticated, setLoginStage]);

  if (loginStage !== LOGIN_STAGES.AUTHENTICATED) {
    if (loginStage === LOGIN_STAGES.LOGIN) {
      return (
        <Login
          className={className}
          onLogin={() => {
            handleLoginSuccess();
          }}
        />
      );
    }

    if (loginStage === LOGIN_STAGES.OTP) {
      return (
        <OtpVerification className={className} onVerified={handleOtpVerified} />
      );
    }
  }

  const handleHeaderNav = (key: string): void => {
    if (key === 'UnlockPasswordReset') {
      setAuthedPage('UnlockPasswordReset');
    }
    if (key === 'UserSearch') {
      setAuthedPage('UserSearch');
    }
  };

  return (
    <div className={className}>
      <JtbHeader
        onSubItemClick={(key) => {
          handleHeaderNav(key);
        }}
      />
      {authedPage === 'UserSearch' ? <UserSearch /> : <UnlockPasswordReset />}
    </div>
  );
}
