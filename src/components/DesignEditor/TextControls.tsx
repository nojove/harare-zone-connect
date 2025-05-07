
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextControlsProps {
  onAdd?: (text: string, style: any) => void;
  onUpdate?: (style: any) => void;
  selectedText?: {
    content: string;
    style: any;
  };
}

const TextControls: React.FC<TextControlsProps> = ({ 
  onAdd, 
  onUpdate,
  selectedText 
}) => {
  const [text, setText] = useState(selectedText?.content || 'New Text');
  const [fontFamily, setFontFamily] = useState(selectedText?.style?.fontFamily || 'Arial');
  const [fontSize, setFontSize] = useState(selectedText?.style?.fontSize || '16px');
  const [bold, setBold] = useState(selectedText?.style?.fontWeight === 'bold');
  const [italic, setItalic] = useState(selectedText?.style?.fontStyle === 'italic');
  const [underline, setUnderline] = useState(selectedText?.style?.textDecoration === 'underline');
  const [alignment, setAlignment] = useState(selectedText?.style?.textAlign || 'left');
  
  const handleAddText = () => {
    if (onAdd) {
      onAdd(text, {
        fontFamily,
        fontSize,
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? 'italic' : 'normal',
        textDecoration: underline ? 'underline' : 'none',
        textAlign: alignment
      });
    }
  };
  
  const handleStyleChange = (property: string, value: string | boolean) => {
    if (property === 'bold') {
      setBold(value as boolean);
      if (onUpdate) {
        onUpdate({ fontWeight: value ? 'bold' : 'normal' });
      }
    } else if (property === 'italic') {
      setItalic(value as boolean);
      if (onUpdate) {
        onUpdate({ fontStyle: value ? 'italic' : 'normal' });
      }
    } else if (property === 'underline') {
      setUnderline(value as boolean);
      if (onUpdate) {
        onUpdate({ textDecoration: value ? 'underline' : 'none' });
      }
    } else if (property === 'alignment') {
      setAlignment(value as string);
      if (onUpdate) {
        onUpdate({ textAlign: value });
      }
    } else if (property === 'fontFamily') {
      setFontFamily(value as string);
      if (onUpdate) {
        onUpdate({ fontFamily: value });
      }
    } else if (property === 'fontSize') {
      setFontSize(value as string);
      if (onUpdate) {
        onUpdate({ fontSize: value });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text-content">Text Content</Label>
        <Input
          id="text-content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="font-family">Font</Label>
        <Select 
          value={fontFamily} 
          onValueChange={(value) => handleStyleChange('fontFamily', value)}
        >
          <SelectTrigger id="font-family">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Verdana">Verdana</SelectItem>
            <SelectItem value="Courier New">Courier New</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="font-size">Font Size</Label>
        <Select 
          value={fontSize} 
          onValueChange={(value) => handleStyleChange('fontSize', value)}
        >
          <SelectTrigger id="font-size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10px">10px</SelectItem>
            <SelectItem value="12px">12px</SelectItem>
            <SelectItem value="14px">14px</SelectItem>
            <SelectItem value="16px">16px</SelectItem>
            <SelectItem value="18px">18px</SelectItem>
            <SelectItem value="20px">20px</SelectItem>
            <SelectItem value="24px">24px</SelectItem>
            <SelectItem value="32px">32px</SelectItem>
            <SelectItem value="48px">48px</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={bold ? "default" : "outline"}
          size="icon"
          onClick={() => handleStyleChange('bold', !bold)}
          className="w-10 h-10"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={italic ? "default" : "outline"}
          size="icon"
          onClick={() => handleStyleChange('italic', !italic)}
          className="w-10 h-10"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={underline ? "default" : "outline"}
          size="icon"
          onClick={() => handleStyleChange('underline', !underline)}
          className="w-10 h-10"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={alignment === 'left' ? "default" : "outline"}
          size="icon"
          onClick={() => handleStyleChange('alignment', 'left')}
          className="w-10 h-10"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant={alignment === 'center' ? "default" : "outline"}
          size="icon"
          onClick={() => handleStyleChange('alignment', 'center')}
          className="w-10 h-10"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant={alignment === 'right' ? "default" : "outline"}
          size="icon"
          onClick={() => handleStyleChange('alignment', 'right')}
          className="w-10 h-10"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <Button 
        onClick={handleAddText}
        className="w-full"
      >
        Add Text
      </Button>
    </div>
  );
};

export default TextControls;
