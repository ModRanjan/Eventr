import { Label } from '@/Atoms/Label';
import { useEffect } from 'react';
import { default as HomePage } from '../../design-system/Organisms/Home';
// import PageLayout from '../../design-system/Organisms/Layout/PageLayout';

const Home = () => {
  return (
    <div className="top-0 z-50 bg-white">
      <Label>Logged in</Label>
    </div>
  );
};

export default Home;
