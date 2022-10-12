import { Image } from '../../Atom/Image';
import { Button } from '../../Atom/Button';

type LogoProps={
  className:string;
  url?:string;
}
const Logo = ({ className, url }:LogoProps) => {
  return (
    <Button link={url} customClassName={' '}>
      <Image src={'/images/web3.png'} alt="logo" className={className} />
    </Button>
  );
};

export default Logo;
