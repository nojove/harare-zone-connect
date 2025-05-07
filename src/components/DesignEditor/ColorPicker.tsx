
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ColorPickerProps {
  onChange?: (color: string, opacity: number) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(100);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    if (onChange) {
      onChange(e.target.value, opacity / 100);
    }
  };

  const handleOpacityChange = (value: number[]) => {
    setOpacity(value[0]);
    if (onChange) {
      onChange(color, value[0] / 100);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="color">Color</Label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="color"
            id="color"
            value={color}
            onChange={handleColorChange}
            className="w-10 h-10 rounded cursor-pointer"
          />
          <div
            className="w-full h-10 rounded"
            style={{ 
              backgroundColor: color,
              opacity: opacity / 100,
              border: '1px solid #e2e8f0' 
            }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <Label htmlFor="opacity">Opacity</Label>
          <span className="text-sm">{opacity}%</span>
        </div>
        <Slider
          id="opacity"
          defaultValue={[opacity]}
          max={100}
          step={1}
          onValueChange={handleOpacityChange}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-6 gap-2 mt-4">
        {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
          '#00ffff', '#ff00ff', '#c0c0c0', '#808080', '#800000', '#808000', 
          '#008000', '#800080', '#008080', '#000080', '#ff6600', '#6600ff'].map((presetColor) => (
          <button
            key={presetColor}
            className="w-8 h-8 rounded-full border border-gray-200"
            style={{ backgroundColor: presetColor }}
            onClick={() => {
              setColor(presetColor);
              if (onChange) {
                onChange(presetColor, opacity / 100);
              }
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
