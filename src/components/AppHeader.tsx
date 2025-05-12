
import { FC } from 'react';
import { Link } from 'react-router-dom';

const AppHeader: FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white h-20 w-full shadow-md">
      <Link to="/" className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">HZ</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Harare Zone Connect</h1>
            <p className="text-sm">Your Local Directory & Classifieds</p>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default AppHeader;
