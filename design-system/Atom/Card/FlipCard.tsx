import React from 'react';

type cardType = {
  imgSrc: string;
  name: string;
  description?: String;
};

const Card = ({
  imgSrc,
  name = 'The Kings Man',
  description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
itaque assumenda saepe animi maxime libero non quasi, odit natus
veritatis enim culpa nam inventore doloribus quidem temporibus
amet velit accusamus.`,
}: cardType) => {
  return (
    <div className="w-[350px] h-[420px] bg-transparent cursor-pointer group perspective">
      <div className="relative w-full h-full duration-1000 preserve-3d group-hover:my-rotate-y-180">
        <div className="absolute w-full h-full backface-hidden">
          <img src={imgSrc} className="w-full h-full" alt={name} />
        </div>
        <div className="absolute w-full h-full overflow-hidden bg-gray-100 my-rotate-y-180 backface-hidden">
          <div className="flex flex-col items-center justify-center h-full px-2 pb-24 text-center text-gray-800">
            <h1 className="text-3xl font-semibold">{name}</h1>
            <p className="my-2">9.0 Rating</p>
            <p>{description}</p>
            <button className="absolute px-6 py-2 font-semibold text-white duration-1000 delay-500 scale-0 bg-teal-500 rounded-full -bottom-20 group-hover:bottom-20 group-hover:scale-125">
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
