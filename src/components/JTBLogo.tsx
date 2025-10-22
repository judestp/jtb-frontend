import Image from 'next/image';
import type { JSX } from 'react';

export interface IJTBLogoProps {
  className?: string;
  width?: number;
  height?: number;
  invert?: boolean;
}

export default function JTBLogo({
  className,
  width = 61,
  height = 35,
  invert = false,
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

  return (
    <Image
      className={classes}
      src="/cbimage.png"
      alt="JTB Logo"
      width={width}
      height={height}
    />
  );
}
