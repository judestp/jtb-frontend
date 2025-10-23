'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import type { JSX } from 'react';

interface IQueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({
  children,
}: IQueryProviderProps): JSX.Element {
  const createQueryClient = (): QueryClient =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          retry: 1,
        },
      },
    });

  const [queryClient] = useState<QueryClient>(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
