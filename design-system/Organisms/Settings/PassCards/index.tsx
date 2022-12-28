import { Label } from '@/Atoms/Label';
import { PassCategoryCard } from '@/Molecules/Cards/PassCategoryCard';

const PassCards = () => {
  return (
    <div className="px-4 py-5 space-y-4 sm:py-6 sm:px-0">
      <Label className="sm:px-6 lg:px-8">
        <h3 className="section-title">Your Passes</h3>
      </Label>

      <div className="max-w-4xl mx-auto overflow-hidden bg-white sm:px-6 lg:px-8">
        <div className="flex flex-col gap-y-4">
          <PassCategoryCard passType="normal" price={199} title="silver" />

          <PassCategoryCard passType="gold" price={649} title="gold" />

          <PassCategoryCard passType="mint" price={399} title="platinum" />
        </div>
      </div>
    </div>
  );
};

export default PassCards;
