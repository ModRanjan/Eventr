import { Icon } from '@/Atoms/Icon';
import PassCard from '@/Molecules/PassCard';
import { BsCheck2All } from 'react-icons/bs';

const Passes = () => {
  return (
    <section className="mx-0 my-auto text-center ">
      <h2 className="mb-5 text-3xl text-center">Your Passes</h2>

      <PassCard passType="normal" price={149} title="silver">
        <ul>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">
              Lorem ipsum consectetur adipisicing elit.
            </span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">
              Nesciunt quod atque inventore mollitia.
            </span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">Video Editing Mastery Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Instagram Growth Mastery Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Social Course By LeadsGuru</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Organic Affiliate Marketing Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Upto 90% Commission On Every Referral.</span>
          </li>
        </ul>
      </PassCard>

      <PassCard passType="gold" price={649} title="gold">
        <ul>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold text-yellow-500 justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">Public Speaking Mastery Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold text-yellow-500 justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Spoken English Mastery Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold text-yellow-500 justify-self-start"
              icon={BsCheck2All}
            />

            <span className="fs-3">Communication Mastery Course</span>
          </li>

          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold text-yellow-500 justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">Email Marketing Mastery Course </span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold text-yellow-500 justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">Sales Funnel Mastery Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold text-yellow-500 justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">Advanced Affiliate Marketing Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold text-yellow-500 justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">All Silver Courses Free As A Bonus.</span>
          </li>
        </ul>
      </PassCard>
      <PassCard passType="platinum" price={399} title="platinum">
        <ul className="list">
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">Institutional Digital Marketing Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Advanced Copywriting Course</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />
            <span className="fs-3">8 Gold Courses Free As A Bonus</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">6 Silver Courses Free As A Bonus</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Course Completion Certifcate</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Icon
              className="inline-block w-8 h-8 font-bold justify-self-start "
              icon={BsCheck2All}
            />

            <span className="fs-3">Upto 90 % Commission On Every Sale</span>
          </li>
          <p className="text-center plan-text">15 skills based courses !</p>
        </ul>
      </PassCard>
    </section>
  );
};

export default Passes;
