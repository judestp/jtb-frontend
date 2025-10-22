'use client';

import React, { useCallback, useState } from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import '@/i18n.ts';

export interface ILoginProps {
  className?: string;
  defaultUsername?: string;
  onLogin?: (args: { usernameOrEmail: string; password: string; rememberMe: boolean }) => void;
  onForgotPassword?: () => void;
}

export default function Login({
  className,
  defaultUsername = 'admin@gmail.com',
  onLogin,
  onForgotPassword,
}: ILoginProps): JSX.Element {
  const { t } = useTranslation(['common', 'auth']);

  const [usernameOrEmail, setUsernameOrEmail] = useState<string>(defaultUsername);
  const [password, setPassword] = useState<string>('123');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (typeof onLogin === 'function') {
        onLogin({ usernameOrEmail, password, rememberMe });
      }
    },
    [onLogin, password, rememberMe, usernameOrEmail],
  );

  return (
    <section
      className={clsx(
        'bg-white',
        'border',
        'border-gray-200',
        'rounded-lg',
        'shadow-sm',
        'p-6',
        'md:p-8',
        className,
      )}
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {t('pages.signIn', { defaultValue: 'Sign in' })}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="login-username" className="block text-sm font-semibold text-gray-700">
            {t('fields.usernameOrEmail', { defaultValue: 'ID or Email' })}
          </label>
          <input
            id="login-username"
            type="text"
            value={usernameOrEmail}
            onChange={(e) => {
              setUsernameOrEmail(e.target.value ?? '');
            }}
            placeholder={t('fields.placeholder', { defaultValue: 'Enter your ID or email' })}
            className={clsx(
              'mt-2',
              'w-full',
              'rounded-md',
              'border',
              'border-gray-300',
              'bg-white',
              'px-4',
              'py-3',
              'text-gray-900',
              'placeholder-gray-400',
              'shadow-sm',
              'focus:border-blue-500',
              'focus:outline-none',
              'focus:ring-2',
              'focus:ring-blue-500',
            )}
            aria-label={t('fields.usernameOrEmail', { defaultValue: 'ID or Email' })}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700">
            {t('fields.password', { defaultValue: 'Password' })}
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value ?? '');
            }}
            placeholder={t('fields.passwordPlaceholder', { defaultValue: 'Enter your password' })}
            className={clsx(
              'mt-2',
              'w-full',
              'rounded-md',
              'border',
              'border-gray-300',
              'bg-white',
              'px-4',
              'py-3',
              'text-gray-900',
              'placeholder-gray-400',
              'shadow-sm',
              'focus:border-blue-500',
              'focus:outline-none',
              'focus:ring-2',
              'focus:ring-blue-500',
            )}
            aria-label={t('fields.password', { defaultValue: 'Password' })}
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(Boolean(e.target.checked));
              }}
              className="h-4 w-4"
            />
            <span className="text-sm">{t('fields.rememberMe', { defaultValue: 'Remember me' })}</span>
          </label>

          <button
            type="button"
            onClick={() => {
              if (typeof onForgotPassword === 'function') {
                onForgotPassword();
              }
            }}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            {t('actions.forgotPassword', { defaultValue: 'Forgot password?' })}
          </button>
        </div>

        <button
          type="submit"
          className={clsx(
            'w-full',
            'rounded-md',
            'bg-blue-600',
            'px-5',
            'py-3',
            'font-semibold',
            'text-white',
            'shadow-sm',
            'hover:bg-blue-700',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-blue-500',
          )}
          aria-label={t('actions.signIn', { defaultValue: 'Sign in' })}
        >
          {t('actions.signIn', { defaultValue: 'Sign in' })}
        </button>
      </form>
    </section>
  );
}
