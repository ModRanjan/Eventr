export const Banner = () => {
  return (
    <div className="fixed flex items-center justify-center w-full min-h-screen px-2 sm:px-10">
      <div className="relative w-full max-w-lg">
        <div className="absolute top-0 bg-purple-300 rounded-full -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 bg-yellow-300 rounded-full -right-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-300 rounded-full -bottom-8 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};
