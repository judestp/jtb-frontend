'use client';

import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n.ts';

export interface ILanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className }: ILanguageSelectorProps): JSX.Element {
  const { i18n } = useTranslation();

  return (
    <div className={className}>
      <label htmlFor="language-select" className="block text-xs font-semibold text-gray-600 mb-1">
        Language
      </label>
      <select
        id="language-select"
        value={i18n.language && i18n.language.startsWith('ja') ? 'ja' : 'en'}
        onChange={(e) => {
          void i18n.changeLanguage(e.target.value);
        }}
        className="w-40 border border-gray-300 bg-white text-sm rounded-md px-2 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
}
