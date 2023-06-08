export const SimpleLoaging = () => {
  return (
    <div className="relative m-8 space-y-4">
      <div className="flex items-center justify-between p-5 space-x-8 bg-white rounded-lg">
        <div className="flex-1">
          <div className="w-48 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div>
          <div className="w-24 h-6 bg-purple-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center justify-between p-5 space-x-8 bg-white rounded-lg">
        <div className="flex-1">
          <div className="w-56 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div>
          <div className="w-20 h-6 bg-yellow-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center justify-between p-5 space-x-8 bg-white rounded-lg">
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded animate-pulse w-44"></div>
        </div>
        <div>
          <div className="h-6 bg-pink-300 rounded-lg animate-pulse w-28"></div>
        </div>
      </div>
    </div>
  );
};
