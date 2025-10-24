'use client';

import { useCallback, useState } from 'react';
import type { JSX } from 'react';
import { useForm, Controller } from 'react-hook-form';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n.ts';
import en from './locales/en.json';
import ja from './locales/ja.json';
import { PASSWORD_MIN_LENGTH } from '@/config/authUi.ts';

export interface IPasswordResetProps {
  className?: string;
  onSaved?: () => void;
}

interface IFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordReset({
  className,
  onSaved,
}: IPasswordResetProps): JSX.Element {
  if (!i18n.hasResourceBundle('en', 'passwordReset')) {
    i18n.addResourceBundle('en', 'passwordReset', en, true, true);
  }
  if (!i18n.hasResourceBundle('ja', 'passwordReset')) {
    i18n.addResourceBundle('ja', 'passwordReset', ja, true, true);
  }

  const { t } = useTranslation(['common', 'passwordReset']);
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [submitErrorKey, setSubmitErrorKey] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<IFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const handleSave = useCallback(
    (data: IFormData): void => {
      setSubmitErrorKey(null);

      if (data.newPassword.length < PASSWORD_MIN_LENGTH) {
        setError('newPassword', { type: 'minLength', message: 'minLength' });
        return;
      }
      if (data.confirmPassword !== data.newPassword) {
        setError('confirmPassword', { type: 'mismatch', message: 'mismatch' });
        return;
      }

      /* Frontend-only flow: show success and disable button */
      setSaved(true);
      if (typeof onSaved === 'function') {
        onSaved();
      }
    },
    [onSaved, setError],
  );

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
        {saved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-center">
            {t('passwordReset:messages.saved', {
              defaultValue: 'New password has been set.',
            })}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {t('passwordReset:title', { defaultValue: 'Password Setup' })}
        </h2>

        {submitErrorKey !== null && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-center">
            {t(`passwordReset:errors.${String(submitErrorKey)}`, {
              defaultValue: t('common:errors.unexpected', {
                defaultValue: 'An unexpected error occurred. Please try again.',
              }),
            })}
          </div>
        )}

        <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
          <div>
            <label
              htmlFor="current"
              className="block text-sm font-semibold text-gray-700"
            >
              {t('passwordReset:fields.currentPassword', {
                defaultValue: 'Current Password',
              })}
            </label>
            <div className="relative mt-2">
              <Controller
                name="currentPassword"
                control={control}
                rules={{ required: 'requiredCurrent' }}
                render={({ field: { name, onChange, onBlur, value, ref } }) => (
                  <input
                    id="current"
                    type={showCurrent ? 'text' : 'password'}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={typeof value === 'string' ? value : ''}
                    className={clsx(
                      'w-full rounded-md border',
                      isSubmitted && errors.currentPassword
                        ? 'border-red-500'
                        : 'border-gray-300',
                      'bg-white px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 shadow-sm',
                      'focus:outline-none focus:ring-2',
                      isSubmitted && errors.currentPassword
                        ? 'focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-blue-500 focus:border-blue-500',
                    )}
                    aria-label={t('passwordReset:fields.currentPassword', {
                      defaultValue: 'Current Password',
                    })}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => {
                  setShowCurrent((v) => !v);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={t('passwordReset:actions.toggle', {
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
            {isSubmitted && errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">
                {typeof errors.currentPassword.message === 'string' &&
                  t(
                    `passwordReset:errors.${String(errors.currentPassword.message)}`,
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

          <div>
            <label
              htmlFor="new"
              className="block text-sm font-semibold text-gray-700"
            >
              {t('passwordReset:fields.newPassword', {
                defaultValue: 'New Password',
              })}
            </label>
            <div className="relative mt-2">
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: 'requiredNew',
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: 'minLength',
                  },
                }}
                render={({ field: { name, onChange, onBlur, value, ref } }) => (
                  <input
                    id="new"
                    type={showNew ? 'text' : 'password'}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={typeof value === 'string' ? value : ''}
                    className={clsx(
                      'w-full rounded-md border',
                      isSubmitted && errors.newPassword
                        ? 'border-red-500'
                        : 'border-gray-300',
                      'bg-white px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 shadow-sm',
                      'focus:outline-none focus:ring-2',
                      isSubmitted && errors.newPassword
                        ? 'focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-blue-500 focus:border-blue-500',
                    )}
                    aria-label={t('passwordReset:fields.newPassword', {
                      defaultValue: 'New Password',
                    })}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => {
                  setShowNew((v) => !v);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                aria-label={t('passwordReset:actions.toggle', {
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
            {isSubmitted && errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {typeof errors.newPassword.message === 'string' &&
                  t(
                    `passwordReset:errors.${String(errors.newPassword.message)}`,
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

          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-semibold text-gray-700"
            >
              {t('passwordReset:fields.confirmPassword', {
                defaultValue: 'Confirm New Password',
              })}
            </label>
            <div className="relative mt-2">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'requiredConfirm',
                  validate: (value) =>
                    value === getValues('newPassword') ? true : 'mismatch',
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
                    aria-label={t('passwordReset:fields.confirmPassword', {
                      defaultValue: 'Confirm New Password',
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
                aria-label={t('passwordReset:actions.toggle', {
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
                    `passwordReset:errors.${String(errors.confirmPassword.message)}`,
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
            disabled={saved}
            className={clsx(
              'w-full rounded-md bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              saved && 'opacity-60 cursor-not-allowed',
            )}
            aria-label={t('passwordReset:actions.save', {
              defaultValue: 'Save',
            })}
          >
            {t('passwordReset:actions.save', { defaultValue: 'Save' })}
          </button>
        </form>
      </div>
    </section>
  );
}
