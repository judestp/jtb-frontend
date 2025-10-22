'use client';

import { useState } from 'react';
import '@/styles/scss/main.scss';
import UnlockPasswordReset from '@/components/UnlockPasswordReset/UnlockPasswordReset.tsx';
import UserSearch from '@/components/UserSearch/UserSearch.tsx';
import Login from '@/components/Login/Login.tsx';
import JtbHeader from '@/components/Header/Header.tsx';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector.tsx';
import '@/i18n.ts';

const pages = {
  UnlockPasswordReset,
  UserSearch,
  Login,
} as const;

type PageKey = keyof typeof pages;

function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>(
    'UnlockPasswordReset',
  );
  

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
        <LanguageSelector className="mt-4" />
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
        </div>
      </div>
    </div>
  );
}

export default App;
