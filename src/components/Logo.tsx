import Image from 'next/image';
import type { JSX } from 'react';

export interface IJTBLogoProps {
  className?: string;
  width?: number;
  height?: number;
  invert?: boolean;
  zoom?: number;
}

export default function JTBLogo({
  className,
  width = 61,
  height = 35,
  invert = false,
  zoom = 1,
}: IJTBLogoProps): JSX.Element {
  const classes = [
    'block',
    'select-none',
    'pointer-events-none',
    invert ? 'invert' : undefined,
    className,
  ]
    .filter((c): c is string => typeof c === 'string' && c.length > 0)
    .join(' ');

  const scale = zoom > 0 ? zoom : 1;
  const renderedWidth = Math.round(width * scale);
  const renderedHeight = Math.round(height * scale);

  return (
    <Image
      className={classes}
      src="/jtb-logo.png"
      alt="JTB Logo"
      width={renderedWidth}
      height={renderedHeight}
    />
  );
}
