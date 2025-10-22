'use client';

import { useCallback, useMemo, useState } from 'react';
import type { JSX } from 'react';
import JTBLogo from '@/components/JTBLogo.tsx';

export interface IMenuItem {
  key: string;
  label: string;
  onClick?: () => void;
  children?: IMenuItem[];
}

export interface IJtbHeaderProps {
  className?: string;
  activeTopKey?: string;
  onTopChange?: (key: string) => void;
  onSubItemClick?: (key: string) => void;
}

export default function JtbHeader({
  className,
  activeTopKey = 'Management',
  onTopChange,
  onSubItemClick,
}: IJtbHeaderProps): JSX.Element {
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);

  const join = (xs: Array<string | undefined>): string => {
    return xs
      .filter((x): x is string => typeof x === 'string' && x.length > 0)
      .join(' ');
  };

  const topMenus = useMemo<IMenuItem[]>(() => {
    return [
      { key: 'Management', label: 'Management' },
      { key: 'GroupQuote', label: 'Group Quote' },
      { key: 'TourInformation', label: 'Tour Information' },
      { key: 'DocumentManagement', label: 'Document Management' },
      { key: 'ApprovalRequest', label: 'Approval Request' },
      { key: 'Reports', label: 'Reports' },
    ];
  }, []);

  const managementItems = useMemo<IMenuItem[]>(() => {
    return [
      { key: 'Master', label: 'Master' },
      { key: 'Setting', label: 'Setting' },
      { key: 'UserId', label: 'User ID' },
      { key: 'UnlockPasswordReset', label: 'Lock Release/\$Password Reset' },
      {
        key: 'DepartmentGroupInfoApp',
        label: 'Department/\nGroup\nInformation\nApplication',
      },
    ];
  }, []);

  const handleTopClick = useCallback(
    (key: string) => {
      if (typeof onTopChange === 'function') {
        onTopChange(key);
      }
    },
    [onTopChange],
  );

  const handleSubClick = useCallback(
    (key: string) => {
      if (typeof onSubItemClick === 'function') {
        onSubItemClick(key);
      }
      setOpenMenuKey(null);
    },
    [onSubItemClick],
  );

  return (
    <header className={join(['w-full', 'bg-white', className])}>
      <div className="h-12 bg-gradient-to-r from-cyan-800 via-cyan-600 to-cyan-400">
        <div className="h-full flex items-center px-4">
          <JTBLogo />
        </div>
      </div>

      <nav className="px-6">
        <ul className="flex gap-8 border-b border-gray-200">
          {topMenus.map((m) => {
            const isActive = m.key === activeTopKey;
            return (
              <li key={m.key} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    handleTopClick(m.key);
                    if (m.key === 'Management') {
                      setOpenMenuKey((prev) => {
                        return prev === 'Management' ? null : 'Management';
                      });
                    } else {
                      setOpenMenuKey(null);
                    }
                  }}
                  className={join([
                    'py-3',
                    'text-sm',
                    'font-semibold',
                    isActive ? 'text-blue-700' : 'text-gray-700',
                    'hover:text-blue-700',
                    'border-b-2',
                    isActive ? 'border-blue-700' : 'border-transparent',
                  ])}
                >
                  {m.label}
                </button>

                {m.key === 'Management' && openMenuKey === 'Management' ? (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-md border border-gray-200 bg-white p-2 shadow-lg z-10">
                    <ul className="flex flex-col">
                      {managementItems.map((item) => {
                        return (
                          <li key={item.key}>
                            <button
                              type="button"
                              onClick={() => {
                                handleSubClick(item.key);
                              }}
                              className="w-full text-left rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.label.split('\n').map((line, idx) => {
                                return (
                                  <span key={String(idx)} className="block">
                                    {line}
                                  </span>
                                );
                              })}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
