import { Image } from '../Image';

type PropsType = {
  imgSrc: string;
  name: string;
  description?: String;
  onClick: () => void;
};

export const NftCard = ({ imgSrc, name, description, onClick }: PropsType) => {
  return (
    <div
      onClick={onClick}
      className="flex-auto flex-shrink-0 overflow-hidden transition-shadow duration-300 ease-in-out shadow-md cursor-pointer rounded-xl w-80 hover:shadow-lg"
    >
      <Image
        className="object-cover w-full rounded-t-lg h-96"
        src={imgSrc}
        alt={name}
      />

      <div className="h-full px-6 py-4 space-y-1 bg-white ">
        <p className="text-xl font-bold text-black capitalize font-Roboto">
          {name}
        </p>

        <p className="text-base line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

// <div className="flex flex-col max-w-sm overflow-hidden transition-shadow duration-300 ease-in-out rounded-lg shadow-md cursor-pointer bg-primary-100 snap-center w-72 sm:w-1/2 md:w-1/3 lg:w-1/4 hover:shadow-lg dark:shadow-primary-200 outline-1">
//   <img className="w-full h-full rounded-t-lg " src={imgSrc} alt={name} />

//   <div className="px-6 py-3">
//     <p className="mb-2 text-xl font-bold text-zinc-900">{name}</p>
//     <p className="text-base text-zinc-700">{description}</p>
//   </div>

//   <div className="px-6 pt-2 pb-2">
//     <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">
//       #photography
//     </span>
//     <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">
//       #travel
//     </span>
//     <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">
//       #winter
//     </span>
//   </div>
// </div>
