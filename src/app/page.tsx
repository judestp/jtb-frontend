'use client';

import { useState } from 'react';
import '@/styles/scss/main.scss';
import UnlockPasswordReset from '@/components/UnlockPasswordReset/UnlockPasswordReset.tsx';
import UserSearch from '@/components/UserSearch/UserSearch.tsx';
import JtbHeader from '@/components/Header/Header.tsx';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector.tsx';
import QueryProvider from '@/providers/QueryProvider.tsx';
import '@/i18n.ts';
import LoginOrchestrator from '@/components/LoginOrchestrator/LoginOrchestrator.tsx';

const pages = {
  public: {
    'Login & OTP': LoginOrchestrator,
  },
  private: {
    UserSearch,
    UnlockPasswordReset,
  },
} as const;

const allPages = {
  ...pages.public,
  ...pages.private,
} as const;

type PageKey = keyof typeof allPages;

function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('Login & OTP');

  const isKeyOf = <T extends object>(
    obj: T,
    key: string,
  ): key is Extract<keyof T, string> => {
    return key in obj;
  };

  const handleNavigation = (page: PageKey) => {
    setCurrentPage(page);
  };

  const CurrentPageComponent = allPages[currentPage];
  const isPrivate = ((): boolean => {
    return currentPage in pages.private;
  })();

  return (
    <QueryProvider>
      <div className="grid grid-cols-[auto_1fr] h-screen">
        <aside
          className="border-r border-gray-300 p-4 bg-gray-100 w-auto flex flex-col justify-between"
          aria-label="Component navigation"
        >
          <div>
            {Object.keys(allPages).map((page) => {
              if (isKeyOf(allPages, page)) {
                const key = page;
                return (
                  <div
                    key={key}
                    className={`cursor-pointer p-2 hover:bg-gray-200 font-bold ${
                      currentPage === key ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => {
                      handleNavigation(key);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => null}
                    aria-label={key}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <LanguageSelector className="mt-4" />
        </aside>

        <div className="main-content relative h-screen overflow-y-auto">
          {isPrivate ? (
            <JtbHeader
              onSubItemClick={(key) => {
                if (key === 'UnlockPasswordReset') {
                  handleNavigation('UnlockPasswordReset');
                }
              }}
            />
          ) : null}
          <CurrentPageComponent />
        </div>
      </div>
    </QueryProvider>
  );
}

export default App;
