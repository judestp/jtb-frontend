'use client';

import { useCallback, useState } from 'react';
import type { JSX } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n.ts';
import JTBLogo from '@/components/Logo.tsx';
import { verifyOtp } from '@/services/authService.ts';
import en from './locales/en.json';
import ja from './locales/ja.json';
import { LOGIN_STAGES, useAuthUiStore } from '@/stores/authUiStore.ts';

interface IOtpFormData {
  otp: string;
}

export interface IOtpVerificationProps {
  className?: string;
  onVerified?: () => void;
}

export default function OtpVerification({
  className,
  onVerified,
}: IOtpVerificationProps): JSX.Element {
  const { setLoginStage } = useAuthUiStore();
  if (!i18n.hasResourceBundle('en', 'otp')) {
    i18n.addResourceBundle('en', 'otp', en, true, true);
  }
  if (!i18n.hasResourceBundle('ja', 'otp')) {
    i18n.addResourceBundle('ja', 'otp', ja, true, true);
  }

  const { t } = useTranslation(['common', 'otp']);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<IOtpFormData>({
    defaultValues: { otp: '123456' },
    mode: 'onSubmit',
  });

  const mutation = useMutation({
    mutationFn: (data: IOtpFormData) => verifyOtp(data.otp),
    onSuccess: (res) => {
      if (!res.success) {
        setErrorKey('invalidOrExpiredOtp');
        return;
      }
      setErrorKey(null);
      setLoginStage(LOGIN_STAGES.AUTHENTICATED);
      if (typeof onVerified === 'function') {
        onVerified();
      }
    },
    onError: (err) => {
      setErrorKey('serverError');
      console.error('OTP verify error:', err);
    },
  });

  const handleFormSubmit = useCallback(
    (data: IOtpFormData): void => {
      setErrorKey(null);
      mutation.mutate(data);
    },
    [mutation],
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
            {errorKey !== null && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-center">
                {t(`otp:errors.${String(errorKey)}`, {
                  defaultValue: t('common:errors.unexpected', {
                    defaultValue:
                      'An unexpected error occurred. Please try again.',
                  }),
                })}
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {t('otp:title', { defaultValue: 'OTP Verification' })}
            </h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="otp-input"
                  className="block text-sm font-semibold text-gray-700"
                >
                  {t('otp:fields.otp', {
                    defaultValue: 'One-Time Password',
                  })}
                </label>
                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: 'requiredOtp',
                    pattern: {
                      value: new RegExp('[0-9]{6}'),
                      message: 'invalidFormat',
                    },
                  }}
                  render={({
                    field: { name, onChange, onBlur, value, ref },
                  }) => (
                    <input
                      id="otp-input"
                      type="text"
                      inputMode="numeric"
                      minLength={6}
                      maxLength={6}
                      name={name}
                      ref={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={typeof value === 'string' ? value : ''}
                      placeholder={t('otp:fields.placeholderOtp', {
                        defaultValue: 'Enter your 6-digit OTP',
                      })}
                      className={clsx(
                        'mt-2',
                        'w-full',
                        'rounded-md',
                        'border',
                        isSubmitted && errors.otp
                          ? 'border-red-500'
                          : 'border-gray-300',
                        'bg-white',
                        'px-4',
                        'py-3',
                        'text-gray-900',
                        'placeholder-gray-400',
                        'shadow-sm',
                        isSubmitted && errors.otp
                          ? 'focus:border-red-500'
                          : 'focus:border-blue-500',
                        'focus:outline-none',
                        'focus:ring-2',
                        isSubmitted && errors.otp
                          ? 'focus:ring-red-500'
                          : 'focus:ring-blue-500',
                      )}
                      aria-label={t('otp:fields.otp', {
                        defaultValue: 'One-Time Password',
                      })}
                      autoComplete="one-time-code"
                    />
                  )}
                />
                {isSubmitted && errors.otp && (
                  <p className="mt-1 text-sm text-red-600">
                    {typeof errors.otp.message === 'string' &&
                      t(`otp:errors.${String(errors.otp.message)}`, {
                        defaultValue: t('common:errors.unexpected', {
                          defaultValue:
                            'An unexpected error occurred. Please try again.',
                        }),
                      })}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
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
                  mutation.isPending && 'opacity-70 cursor-not-allowed',
                )}
                aria-label={t('otp:actions.verify', { defaultValue: 'Verify' })}
              >
                {mutation.isPending
                  ? t('otp:actions.verifying', { defaultValue: 'Verifying...' })
                  : t('otp:actions.verify', { defaultValue: 'Verify' })}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
