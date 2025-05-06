
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BannerAdProps {
  title: string;
  description: string;
  backgroundColor?: string;
  buttonText?: string;
  buttonLink?: string;
}

const BannerAd: FC<BannerAdProps> = ({ 
  title, 
  description, 
  backgroundColor = 'bg-blue-100',
  buttonText = 'Learn More',
  buttonLink = '/business/advertise'
}) => {
  const navigate = useNavigate();
  
  return (
    <div className={`${backgroundColor} p-4 rounded-lg my-4 shadow-sm`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <Button 
          className="mt-3 md:mt-0 whitespace-nowrap"
          variant="secondary"
          onClick={() => navigate(buttonLink)}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default BannerAd;
