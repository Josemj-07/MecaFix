import logoInverseUrl from '@/assets/logo-inverse.webp';
import logoMarkUrl from '@/assets/logo-mark.webp';
import logoUrl from '@/assets/logo.webp';
import { cn } from '@/utils/cn';

const sources = {
  // "Fix" in carbon, for light surfaces.
  default: { src: logoUrl, width: 640, height: 201 },
  // "Fix" in white, for carbon and night surfaces.
  inverse: { src: logoInverseUrl, width: 640, height: 201 },
  // The faceted M with the wrench, for small spaces.
  mark: { src: logoMarkUrl, width: 200, height: 220 },
} as const;

export type LogoProps = {
  variant?: keyof typeof sources;
  className?: string;
  // Set when the logo is the main content of a link (adds the brand name).
  alt?: string;
};

export const Logo = ({
  variant = 'default',
  className,
  alt = 'MecaFix',
}: LogoProps) => {
  const { src, width, height } = sources[variant];
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      className={cn('h-auto w-auto', className)}
    />
  );
};
