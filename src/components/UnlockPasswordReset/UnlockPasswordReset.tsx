'use client';

import React, { useCallback, useState } from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import '@/i18n.ts';

export interface IUnlockPasswordResetProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  canExecute?: boolean;
  onSearch?: (query: string) => void;
  onExecute?: (query: string) => void;
  onCancel?: () => void;
}

export default function UnlockPasswordReset({
  className,
  placeholder: _placeholder = 'Placeholder',
  defaultValue = '',
  canExecute = false,
  onSearch,
  onExecute,
  onCancel,
}: IUnlockPasswordResetProps): JSX.Element {
  const [query, setQuery] = useState<string>(defaultValue);
  const { t } = useTranslation(['common', 'upr']);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (typeof onSearch === 'function') {
        onSearch(query);
      }
    },
    [onSearch, query],
  );

  const handleExecute = useCallback(() => {
    if (typeof onExecute === 'function') {
      onExecute(query);
    }
  }, [onExecute, query]);

  const handleCancel = useCallback(() => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }, [onCancel]);

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
      <h2 className="text-2xl font-bold text-gray-800">{t('pages.unlockPasswordReset')}</h2>

      <div className="mt-6">
        <label
          htmlFor="upr-target-users"
          className="block text-sm font-semibold text-gray-700"
        >
          {t('fields.targetUsers')}
        </label>

        <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-4">
          <input
            id="upr-target-users"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value ?? '');
            }}
            placeholder={t('fields.placeholder')}
            className={clsx(
              'flex-1',
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
            aria-label="Target Users"
          />

          <button
            type="submit"
            className={clsx(
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
            aria-label="Search"
          >
            {t('actions.search')}
          </button>
        </form>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={handleExecute}
          disabled={!canExecute}
          className={clsx(
            'rounded-md',
            'px-5',
            'py-3',
            'font-semibold',
            'shadow-sm',
            canExecute
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
              : 'bg-blue-200 text-white cursor-not-allowed',
          )}
        >
          {t('actions.execute')}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className={clsx(
            'rounded-md',
            'border',
            'border-gray-300',
            'bg-white',
            'px-5',
            'py-3',
            'font-semibold',
            'text-gray-700',
            'shadow-sm',
            'hover:bg-gray-50',
          )}
        >
          {t('actions.cancel')}
        </button>
      </div>
    </section>
  );
}


