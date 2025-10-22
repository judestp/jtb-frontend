'use client';

import { useCallback, useMemo, useState } from 'react';
import type { JSX } from 'react';
import JTBLogo from '@/components/Logo.tsx';
import { useTranslation } from 'react-i18next';
import '@/i18n.ts';

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
  const { t } = useTranslation(['common', 'header']);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);

  const join = (xs: Array<string | undefined>): string => {
    return xs
      .filter((x): x is string => typeof x === 'string' && x.length > 0)
      .join(' ');
  };

  const topMenus = useMemo<IMenuItem[]>(() => {
    return [
      { key: 'Management', label: t('app.management') },
      { key: 'GroupQuote', label: t('app.groupQuote') },
      { key: 'TourInformation', label: t('app.tourInformation') },
      { key: 'DocumentManagement', label: t('app.documentManagement') },
      { key: 'ApprovalRequest', label: t('app.approvalRequest') },
      { key: 'Reports', label: t('app.reports') },
    ];
  }, [t]);

  const managementItems = useMemo<IMenuItem[]>(() => {
    return [
      { key: 'Master', label: t('header:managementItems.master', { defaultValue: 'Master' }) },
      { key: 'Setting', label: t('header:managementItems.setting', { defaultValue: 'Setting' }) },
      { key: 'UserId', label: t('header:managementItems.userId', { defaultValue: 'User ID' }) },
      { key: 'UnlockPasswordReset', label: t('header:managementItems.unlockPasswordReset', { defaultValue: 'Lock Release/Password Reset' }) },
      {
        key: 'DepartmentGroupInfoApp',
        label: t('header:managementItems.departmentGroupInfoApp', { defaultValue: 'Department/Group Information Application' }),
      },
    ];
  }, [t]);

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
