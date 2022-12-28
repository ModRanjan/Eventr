import { Image } from '@/Atoms/Image';
import { Button } from '@/Atoms/Button';

type LogoProps = {
  className: string;
  url?: string;
  logoSrc?: string;
};

export const Logo = ({ className, url, logoSrc }: LogoProps) => {
  if (!url) {
    return (
      <Image src={logoSrc || '/eventr.svg'} alt="logo" className={className} />
    );
  }

  return (
    <Button link={url} customClasses="inline-block border-0 focus:ring-0">
      <Image src={logoSrc || '/eventr.svg'} alt="logo" className={className} />
    </Button>
  );
};
