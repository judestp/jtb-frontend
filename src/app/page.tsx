'use client';

import { useState } from 'react';
import '@/styles/scss/main.scss';
import Login from '@/components/Login.tsx';
import User from '@/components/User.tsx';

const pages = {
  Login,
  User,
} as const;

type PageKey = keyof typeof pages;

function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('Login');

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
      <div className="border-r border-gray-300 p-4 bg-gray-100 w-auto flex flex-col justify-between">
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
      </div>

      <div className="p-8">
        <CurrentPageComponent />
      </div>
    </div>
  );
}

export default App;
