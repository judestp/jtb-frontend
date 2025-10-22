'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import '@/i18n.ts';

interface IUserRow {
  id: string;
  name: string;
  company: string;
  location: string;
  section: string;
  group: string;
}

export interface IUserSearchProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onCancel?: () => void;
}

export default function UserSearch({
  className,
  placeholder: _placeholder = 'Placeholder',
  defaultValue = '',
  onCancel,
}: IUserSearchProps): JSX.Element {
  const [query, setQuery] = useState<string>(defaultValue);
  const [scope, setScope] = useState<'name' | 'all'>('all');
  const { t } = useTranslation(['common', 'userSearch']);
  const [rows] = useState<IUserRow[]>([
    {
      id: '1',
      name: 'Taro Kimura',
      company: 'Company',
      location: 'Location',
      section: 'Section',
      group: 'Group',
    },
    {
      id: '2',
      name: 'Hanako Sato',
      company: 'Company',
      location: 'Location',
      section: 'Section',
      group: 'Group',
    },
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      return rows;
    }
    return rows.filter((r) => {
      if (scope === 'name') {
        return r.name.toLowerCase().includes(q);
      }
      return (
        r.name.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.section.toLowerCase().includes(q) ||
        r.group.toLowerCase().includes(q)
      );
    });
  }, [query, rows, scope]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    [],
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
      <h2 className="text-3xl font-bold text-gray-800">{t('pages.userSearch')}</h2>

      <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-4">
        <input
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
          aria-label={t('pages.userSearch')}
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

      <div className="mt-4 flex items-center gap-8">
        <label className="inline-flex items-center gap-2 text-gray-700">
          <input
            type="radio"
            name="scope"
            value="name"
            checked={scope === 'name'}
            onChange={() => {
              setScope('name');
            }}
            className="h-4 w-4"
          />
          <span className="text-sm">{t('fields.name')}</span>
        </label>
        <label className="inline-flex items-center gap-2 text-gray-700">
          <input
            type="radio"
            name="scope"
            value="all"
            checked={scope === 'all'}
            onChange={() => {
              setScope('all');
            }}
            className="h-4 w-4"
          />
          <span className="text-sm font-semibold">{t('fields.allFields')}</span>
        </label>

        <button
          type="button"
          onClick={() => {
            setQuery('');
          }}
          className="ml-auto text-sm font-semibold text-blue-700 hover:underline"
        >
          {t('actions.clearSearch')}
        </button>
      </div>

      <div className="mt-8">
        <div className="text-gray-700 font-semibold">{t('fields.user')}</div>

        <div className="mt-3 overflow-hidden rounded-md border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                {[t('fields.name'), t('fields.company'), t('fields.location'), t('fields.section'), t('fields.group')].map((h) => {
                  return (
                    <th key={h} className="px-6 py-3 font-semibold">
                      <div className="flex items-center gap-2">
                        <span>{h}</span>
                        <span className="text-gray-400">▾</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((r) => {
                return (
                  <tr key={r.id} className="border-t border-gray-200">
                    <td className="px-6 py-4">
                      <a href="#" className="text-blue-700 hover:underline">
                        {r.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{r.company}</td>
                    <td className="px-6 py-4 text-gray-700">{r.location}</td>
                    <td className="px-6 py-4 text-gray-700">{r.section}</td>
                    <td className="px-6 py-4 text-gray-700">{r.group}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (typeof onCancel === 'function') {
              onCancel();
            }
          }}
          className={clsx(
            'rounded-md',
            'border',
            'border-gray-300',
            'bg-white',
            'px-6',
            'py-3',
            'font-semibold',
            'text-gray-700',
            'shadow-sm',
            'hover:bg-gray-50',
          )}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}


