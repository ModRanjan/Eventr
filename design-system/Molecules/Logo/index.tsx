import { Image } from '@/Atoms/Image';
import { Button } from '@/Atoms/Button';

type LogoProps = {
  className: string;
  url?: string;
};

const Logo = ({ className, url }: LogoProps) => {
  return (
    <Button link={url} customClasses="inline-block border-0 focus:ring-0">
      <Image src={'/images/web3.png'} alt="logo" className={className} />
    </Button>
  );
};

export default Logo;
