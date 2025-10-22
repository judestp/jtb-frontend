'use client';

import React, { useCallback, useState } from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n.ts';
import JTBLogo from '@/components/Logo.tsx';
import en from './locales/en.json';
import ja from './locales/ja.json';

export interface ILoginProps {
  className?: string;
  defaultUsername?: string;
  onLogin?: (args: {
    usernameOrEmail: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  onForgotPassword?: () => void;
}

export default function Login({
  className,
  defaultUsername = 'admin@gmail.com',
  onLogin,
  onForgotPassword,
}: ILoginProps): JSX.Element {
  if (!i18n.hasResourceBundle('en', 'login')) {
    i18n.addResourceBundle('en', 'login', en, true, true);
  }
  if (!i18n.hasResourceBundle('ja', 'login')) {
    i18n.addResourceBundle('ja', 'login', ja, true, true);
  }

  const { t } = useTranslation(['common', 'login']);

  const [usernameOrEmail, setUsernameOrEmail] =
    useState<string>(defaultUsername);
  const [password, setPassword] = useState<string>('123');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
        'relative',
        'min-h-screen',
        'bg-gradient-to-br',
        'from-cyan-900',
        'via-cyan-700',
        'to-cyan-400',
        'p-4 sm:p-6 md:p-8',
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-center py-8">
          <JTBLogo zoom={3} />
        </div>
        <div className="mx-auto mt-2 sm:mt-4 max-w-md">
          <div
            className={clsx(
              'bg-white',
              'border',
              'border-gray-200',
              'rounded-lg',
              'shadow-sm',
              'h-full',
              'flex',
              'flex-col',
              'p-6',
              'md:p-8',
            )}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {t('login:title', { defaultValue: 'Sign in' })}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="login-username"
                  className="block text-sm font-semibold text-gray-700"
                >
                  {t('login:fields.usernameOrEmail', {
                    defaultValue: 'User ID',
                  })}
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => {
                    setUsernameOrEmail(e.target.value ?? '');
                  }}
                  placeholder={t('login:fields.placeholderId', {
                    defaultValue: 'ID',
                  })}
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
                  aria-label={t('login:fields.usernameOrEmail', {
                    defaultValue: 'User ID',
                  })}
                  autoComplete="username"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  {t('login:fields.password', { defaultValue: 'Password' })}
                </label>
                <div className="relative mt-2">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value ?? '');
                    }}
                    placeholder={t('login:fields.placeholderPassword', {
                      defaultValue: 'password',
                    })}
                    className={clsx(
                      'w-full',
                      'rounded-md',
                      'border',
                      'border-gray-300',
                      'bg-white',
                      'px-4',
                      'py-3',
                      'pr-10',
                      'text-gray-900',
                      'placeholder-gray-400',
                      'shadow-sm',
                      'focus:border-blue-500',
                      'focus:outline-none',
                      'focus:ring-2',
                      'focus:ring-blue-500',
                    )}
                    aria-label={t('login:fields.password', {
                      defaultValue: 'Password',
                    })}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassword((prev) => {
                        return !prev;
                      });
                    }}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      {showPassword ? (
                        <path d="M3.98 8.223a.75.75 0 0 1 1.06-.043l12.78 11.34a.75.75 0 1 1-1.018 1.102l-2.18-1.934A10.5 10.5 0 0 1 12 19.5C6.75 19.5 3 15 3 15s.91-1.195 2.24-2.486a.75.75 0 0 1 .04-1.06l-1.3-1.13zM12 7.5c5.25 0 9 4.5 9 4.5s-.41.54-1.16 1.28l-2.1-1.86a4.5 4.5 0 0 0-6.06-6.06l-1.86-1.62C10.46 7.91 11 7.5 11 7.5h1z" />
                      ) : (
                        <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                      )}
                    </svg>
                  </button>
                </div>
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
                  <span className="text-sm">
                    {t('login:fields.rememberMe', {
                      defaultValue: 'Remember me',
                    })}
                  </span>
                </label>
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
                aria-label={t('login:actions.signIn', {
                  defaultValue: 'Sign in',
                })}
              >
                {t('login:actions.signIn', { defaultValue: 'Sign in' })}
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof onForgotPassword === 'function') {
                      onForgotPassword();
                    }
                  }}
                  className="text-sm font-semibold text-blue-700 hover:underline"
                >
                  {t('login:actions.forgotPassword', {
                    defaultValue: 'Forgot password?',
                  })}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
