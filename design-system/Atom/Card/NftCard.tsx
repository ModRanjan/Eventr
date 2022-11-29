import { Image } from '../Image';

type PropsType = {
  imgSrc: string;
  name: string;
  description?: String;
};

export const NftCard = ({ imgSrc, name, description }: PropsType) => {
  return (
    <div className="flex-shrink-0 h-full overflow-hidden transition-shadow duration-300 ease-in-out rounded-lg shadow-md cursor-pointer hover:shadow-lg w-72 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <Image
        className="object-cover w-full rounded-t-lg h-5/6"
        src={imgSrc}
        alt={name}
      />

      <div className="px-6 py-4 space-y-1 bg-white rounded-b-lg">
        <p className="text-lg font-bold text-black">{name}</p>
        <p className="text-xs m-text-gray">{description}</p>
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
