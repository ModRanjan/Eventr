import { FC } from 'react';

import { Image } from '@/Atoms/Image';
import { Label } from '@/Atoms/Label';
import { Data, Stats } from '@/Atoms/Stats';
import { Paragraph } from '@/Atoms/Paragraph';

interface StatisticsProps {
  statsData: Data[];
}

export const Statistics: FC<StatisticsProps> = ({ statsData }) => {
  return (
    <section className="relative h-[44rem] bg-[#001232]">
      <Image
        src="/images/statistics/statistics-bg01.jpg"
        alt="statistics-bg01"
        className="object-cover object-center w-full opacity-50 h-3/5"
      />

      <div className="absolute inset-0 bg-[#001232] mix-blend-lighten opacity-10 h-3/5" />

      <div className="absolute inset-0 max-w-6xl px-4 mx-auto overflow-hidden h-[48rem] sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto mt-10 text-center text-gray-300 sm:mt-32">
          <Label className="text-lg sm:text-2xl -mt-2 text-[#31d7a9]">
            WHAT WE HAVE DONE
          </Label>

          <h2 className="mt-3 text-2xl font-semibold sm:text-5xl">
            OUR RECENT STATISTICS
          </h2>

          <Paragraph className="w-full mt-4 text-base text-center sm:mt-5 sm:text-xl lg:px-10">
            Stats refers to recent numerical data or metrics that reflect the
            performance of Events, helps in decision-making and track progress.
          </Paragraph>
        </div>

        <div className="bg-[#032055] rounded-3xl py-5 sm:p-6 lg:p-8 sm:py-10 lg:py-12 mt-8">
          <Stats StatsData={statsData} />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
