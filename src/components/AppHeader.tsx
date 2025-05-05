
import { FC } from 'react';

const AppHeader: FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white h-20">
      <h1 className="text-2xl font-bold mb-1">Harare Zone Connect</h1>
      <p className="text-sm">Your Local Directory & Classifieds</p>
    </header>
  );
};

export default AppHeader;
