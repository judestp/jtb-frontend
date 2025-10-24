'use client';

import { useCallback, useState } from 'react';
import type { JSX } from 'react';
import { useForm, Controller } from 'react-hook-form';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n.ts';
import en from './locales/en.json';
import ja from './locales/ja.json';

export interface IPasswordSetupProps {
  className?: string;
  onSave?: (password: string) => void;
}

interface IPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function PasswordSetup({
  className,
  onSave,
}: IPasswordSetupProps): JSX.Element {
  if (!i18n.hasResourceBundle('en', 'passwordSetup')) {
    i18n.addResourceBundle('en', 'passwordSetup', en, true, true);
  }
  if (!i18n.hasResourceBundle('ja', 'passwordSetup')) {
    i18n.addResourceBundle('ja', 'passwordSetup', ja, true, true);
  }

  const { t } = useTranslation(['common', 'passwordSetup']);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<IPasswordFormData>({
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onSubmit',
  });

  const handleSave = useCallback(
    (data: IPasswordFormData): void => {
      if (typeof onSave === 'function') {
        onSave(data.password);
      }
    },
    [onSave],
  );

  /* Avoid watch() to satisfy React Compiler lint; use getValues at validation time */

  return (
    <section className={clsx('p-6', className)}>
      <div
        className={clsx(
          'bg-white',
          'border',
          'border-gray-200',
          'shadow-sm',
          'rounded-lg',
          'p-6',
          'max-w-md',
          'mx-auto',
        )}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {t('passwordSetup:title', { defaultValue: 'Password  Setup' })}
        </h2>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
          <div>
            <label
              htmlFor="psw"
              className="block text-sm font-semibold text-gray-700"
            >
              {t('passwordSetup:fields.password', { defaultValue: 'Password' })}
            </label>
            <div className="relative mt-2">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'requiredPassword',
                  minLength: { value: 8, message: 'minLength' },
                }}
                render={({ field: { name, onChange, onBlur, value, ref } }) => (
                  <input
                    id="psw"
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={typeof value === 'string' ? value : ''}
                    className={clsx(
                      'w-full rounded-md border',
                      isSubmitted && errors.password
                        ? 'border-red-500'
                        : 'border-gray-300',
                      'bg-white px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 shadow-sm',
                      'focus:outline-none focus:ring-2',
                      isSubmitted && errors.password
                        ? 'focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-blue-500 focus:border-blue-500',
                    )}
                    aria-label={t('passwordSetup:fields.password', {
                      defaultValue: 'Password',
                    })}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword((v) => !v);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={t('passwordSetup:actions.toggle', {
                  defaultValue: 'Toggle visibility',
                })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                </svg>
              </button>
            </div>
            {isSubmitted && errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {typeof errors.password.message === 'string' &&
                  t(`passwordSetup:errors.${String(errors.password.message)}`, {
                    defaultValue: t('common:errors.unexpected', {
                      defaultValue:
                        'An unexpected error occurred. Please try again.',
                    }),
                  })}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-semibold text-gray-700"
            >
              {t('passwordSetup:fields.confirmPassword', {
                defaultValue: 'Confirm Password',
              })}
            </label>
            <div className="relative mt-2">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'requiredConfirm',
                  validate: (value) =>
                    value === getValues('password') ? true : 'mismatch',
                }}
                render={({ field: { name, onChange, onBlur, value, ref } }) => (
                  <input
                    id="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={typeof value === 'string' ? value : ''}
                    className={clsx(
                      'w-full rounded-md border',
                      isSubmitted && errors.confirmPassword
                        ? 'border-red-500'
                        : 'border-gray-300',
                      'bg-white px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 shadow-sm',
                      'focus:outline-none focus:ring-2',
                      isSubmitted && errors.confirmPassword
                        ? 'focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-blue-500 focus:border-blue-500',
                    )}
                    aria-label={t('passwordSetup:fields.confirmPassword', {
                      defaultValue: 'Confirm Password',
                    })}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => {
                  setShowConfirm((v) => !v);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={t('passwordSetup:actions.toggle', {
                  defaultValue: 'Toggle visibility',
                })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                </svg>
              </button>
            </div>
            {isSubmitted && errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {typeof errors.confirmPassword.message === 'string' &&
                  t(
                    `passwordSetup:errors.${String(errors.confirmPassword.message)}`,
                    {
                      defaultValue: t('common:errors.unexpected', {
                        defaultValue:
                          'An unexpected error occurred. Please try again.',
                      }),
                    },
                  )}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={clsx(
              'w-full rounded-md bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
            )}
            aria-label={t('passwordSetup:actions.save', {
              defaultValue: 'Save',
            })}
          >
            {t('passwordSetup:actions.save', { defaultValue: 'Save' })}
          </button>
        </form>
      </div>
    </section>
  );
}
