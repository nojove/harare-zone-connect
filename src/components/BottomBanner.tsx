
import { FC } from 'react';
import { Banner } from '../types';

interface BottomBannerProps {
  banner?: Banner;
}

const BottomBanner: FC<BottomBannerProps> = ({ banner }) => {
  if (!banner) {
    // Placeholder banner when no active banners are available
    return (
      <div className="fixed bottom-0 w-full bg-gray-200 h-8 flex items-center justify-center">
        <p className="text-xs text-gray-600">Your Ad Could Be Here</p>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-0 w-full h-8 flex items-center justify-center"
      style={{ backgroundColor: banner.category_id ? '#f1f5f9' : '#e2e8f0' }}
    >
      <p className="text-xs truncate px-4">{banner.title}</p>
    </div>
  );
};

export default BottomBanner;
