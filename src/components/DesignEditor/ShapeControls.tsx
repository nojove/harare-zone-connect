
import React from 'react';
import { Button } from '@/components/ui/button';
import { Square, Circle, Triangle } from 'lucide-react';

interface ShapeControlsProps {
  onAdd?: (shape: string, style: any) => void;
}

const ShapeControls: React.FC<ShapeControlsProps> = ({ onAdd }) => {
  const handleAddShape = (shape: string) => {
    if (onAdd) {
      const style = {
        backgroundColor: '#000000',
        opacity: 1,
        width: '100px',
        height: '100px'
      };
      
      onAdd(shape, style);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-4 h-20"
          onClick={() => handleAddShape('rectangle')}
        >
          <Square className="h-8 w-8 mb-1" />
          <span className="text-xs">Rectangle</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-4 h-20"
          onClick={() => handleAddShape('circle')}
        >
          <Circle className="h-8 w-8 mb-1" />
          <span className="text-xs">Circle</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-4 h-20"
          onClick={() => handleAddShape('triangle')}
        >
          <Triangle className="h-8 w-8 mb-1" />
          <span className="text-xs">Triangle</span>
        </Button>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium">Common shapes</p>
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('star')}
          >
            Star
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('heart')}
          >
            Heart
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('arrow')}
          >
            Arrow
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('line')}
          >
            Line
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('hexagon')}
          >
            Hexagon
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('diamond')}
          >
            Diamond
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('pentagon')}
          >
            Pentagon
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => handleAddShape('octagon')}
          >
            Octagon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShapeControls;
