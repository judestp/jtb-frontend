'use client';

import { useState } from 'react';
import '@/styles/scss/main.scss';
import UnlockPasswordReset from '@/components/UnlockPasswordReset/UnlockPasswordReset.tsx';
import UserSearch from '@/components/UserSearch/UserSearch.tsx';
import JtbHeader from '@/components/Header/Header.tsx';
import { useTranslation } from 'react-i18next';
import '@/i18n.ts';

const pages = {
  UnlockPasswordReset,
  UserSearch,
} as const;

type PageKey = keyof typeof pages;

function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>(
    'UnlockPasswordReset',
  );
  const { i18n } = useTranslation();

  const isKeyOf = <T extends object>(
    obj: T,
    key: string,
  ): key is Extract<keyof T, string> => {
    return key in obj;
  };

  const handleNavigation = (page: PageKey) => {
    setCurrentPage(page);
  };

  const CurrentPageComponent = pages[currentPage];

  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <aside
        className="border-r border-gray-300 p-4 bg-gray-100 w-auto flex flex-col justify-between"
        aria-label="Component navigation"
      >
        <div>
          {Object.keys(pages).map((page) => {
            if (isKeyOf(pages, page)) {
              return (
                <div
                  key={page}
                  className={`cursor-pointer p-2 hover:bg-gray-200 font-bold ${
                    currentPage === page ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => {
                    handleNavigation(page);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => null}
                  aria-label={page}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </div>
              );
            }
            return null;
          })}
        </div>
      </aside>

      <div className="main-content relative h-screen overflow-y-auto">
        <JtbHeader
          onSubItemClick={(key) => {
            if (key === 'UnlockPasswordReset') {
              handleNavigation('UnlockPasswordReset');
            }
          }}
        />
        <div className="px-6 pt-4 pb-8">
          <CurrentPageComponent />
          <div className="absolute left-6 bottom-6 z-10">
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
        </div>
      </div>
    </div>
  );
}

export default App;
