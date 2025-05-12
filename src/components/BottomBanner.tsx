
import { FC } from 'react';
import { Banner } from '../types';

interface BottomBannerProps {
  banner?: Banner;
}

const BottomBanner: FC<BottomBannerProps> = ({ banner }) => {
  // Return null to remove the banner completely as per requirements
  return null;
};

export default BottomBanner;
