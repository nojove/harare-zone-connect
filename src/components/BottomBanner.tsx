
import { FC } from 'react';
import { Banner } from '../types';

interface BottomBannerProps {
  banner?: Banner;
}

const BottomBanner: FC<BottomBannerProps> = ({ banner }) => {
  // Banner component completely removed - returns null to render nothing
  return null;
};

export default BottomBanner;
