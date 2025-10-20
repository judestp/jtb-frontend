import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JTB Front End',
  description: 'JTB Front End',
};
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
export default RootLayout;
