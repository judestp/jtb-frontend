'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { JSX } from 'react';

export default function LanguageInfo(): JSX.Element {
  const { i18n } = useTranslation();
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');

  useEffect(() => {
    // Get the detected language from browser on mount
    const getNavigatorLanguage = (): void => {
      const navigatorLanguage = navigator.language;
      setDetectedLanguage(navigatorLanguage);
    };

    getNavigatorLanguage();
  }, []);

  return (
    <div className="text-xs text-gray-500 mt-2">
      <p>Current language: {i18n.language}</p>
      <p>Browser language: {detectedLanguage}</p>
      <p className="mt-1">
        <a href={`?lng=en`} className="text-blue-600 hover:underline mr-2">
          English
        </a>
        <a href={`?lng=ja`} className="text-blue-600 hover:underline">
          日本語
        </a>
      </p>
    </div>
  );
}
