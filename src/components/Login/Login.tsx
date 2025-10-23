'use client';

import { useCallback, useState } from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n.ts';
import JTBLogo from '@/components/Logo.tsx';
import { loginUser } from '@/services/authService.ts';
import en from './locales/en.json';
import ja from './locales/ja.json';

interface ILoginFormData {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

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

  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ILoginFormData>({
    defaultValues: {
      usernameOrEmail: defaultUsername,
      password: '123',
      rememberMe: false,
    },
    mode: 'onSubmit',
  });

  const loginMutation = useMutation({
    mutationFn: (data: ILoginFormData) => {
      return loginUser(data.usernameOrEmail, data.password);
    },
    onSuccess: (response) => {
      if (response.success) {
        /* Handle potentially undefined token */
        const token = response.token !== undefined ? response.token : '';
        localStorage.setItem('auth_token', token);

        /* Handle potentially undefined user */
        if (response.user !== undefined) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        if (typeof onLogin === 'function') {
          /* Ensure username is properly handled */
          const username =
            response.user?.username !== undefined ? response.user.username : '';
          onLogin({
            usernameOrEmail: username,
            password: '',
            rememberMe: false,
          });
        }
        setLoginError(null);
      } else {
        /* Handle potentially undefined error message */
        const errorMessage =
          response.error !== undefined ? response.error : 'Login failed';
        setLoginError(errorMessage);
      }
    },
    onError: (error) => {
      setLoginError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmitForm = useCallback(
    (data: ILoginFormData) => {
      setLoginError(null);
      loginMutation.mutate(data);
    },
    [loginMutation],
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

            {loginError !== null && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-center">
                {loginError}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="mt-6 space-y-5"
            >
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
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...register('usernameOrEmail', {
                    required: t(
                      'login:errors.requiredUserId',
                      'Enter your user ID.',
                    ),
                  })}
                  placeholder={t('login:fields.placeholderId', {
                    defaultValue: 'ID',
                  })}
                  className={clsx(
                    'mt-2',
                    'w-full',
                    'rounded-md',
                    'border',
                    isSubmitted && errors.usernameOrEmail
                      ? 'border-red-500'
                      : 'border-gray-300',
                    'bg-white',
                    'px-4',
                    'py-3',
                    'text-gray-900',
                    'placeholder-gray-400',
                    'shadow-sm',
                    isSubmitted && errors.usernameOrEmail
                      ? 'focus:border-red-500'
                      : 'focus:border-blue-500',
                    'focus:outline-none',
                    'focus:ring-2',
                    isSubmitted && errors.usernameOrEmail
                      ? 'focus:ring-red-500'
                      : 'focus:ring-blue-500',
                  )}
                  aria-label={t('login:fields.usernameOrEmail', {
                    defaultValue: 'User ID',
                  })}
                  autoComplete="username"
                />
                {isSubmitted && errors.usernameOrEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.usernameOrEmail.message}
                  </p>
                )}
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
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...register('password', {
                      required: t(
                        'login:errors.requiredPassword',
                        'Enter your password.',
                      ),
                    })}
                    placeholder={t('login:fields.placeholderPassword', {
                      defaultValue: 'password',
                    })}
                    className={clsx(
                      'w-full',
                      'rounded-md',
                      'border',
                      isSubmitted && errors.password
                        ? 'border-red-500'
                        : 'border-gray-300',
                      'bg-white',
                      'px-4',
                      'py-3',
                      'pr-10',
                      'text-gray-900',
                      'placeholder-gray-400',
                      'shadow-sm',
                      isSubmitted && errors.password
                        ? 'focus:border-red-500'
                        : 'focus:border-blue-500',
                      'focus:outline-none',
                      'focus:ring-2',
                      isSubmitted && errors.password
                        ? 'focus:ring-red-500'
                        : 'focus:ring-blue-500',
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
                {isSubmitted && errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...register('rememberMe')}
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
                disabled={loginMutation.isPending}
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
                  loginMutation.isPending && 'opacity-70 cursor-not-allowed',
                )}
                aria-label={t('login:actions.signIn', {
                  defaultValue: 'Sign in',
                })}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t('login:actions.signingIn', {
                      defaultValue: 'Signing in...',
                    })}
                  </div>
                ) : (
                  t('login:actions.signIn', { defaultValue: 'Sign in' })
                )}
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
