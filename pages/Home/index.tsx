import { default as HomePage } from '../../design-system/Organisms/Home';
import PageLayout from '../../design-system/Organisms/Layout/PageLayout';

const Home = () => {
  return (
    <div className="top-0 z-50 bg-white">
      <PageLayout>
        <HomePage />
      </PageLayout>
    </div>
  );
};

export default Home;
