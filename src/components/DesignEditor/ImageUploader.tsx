
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  onUpload?: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpload = () => {
    if (preview && onUpload) {
      onUpload(preview);
      // In a real app, you would upload to your server/storage here
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <Label 
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {preview ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-32 mb-2 object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload an image</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG or GIF (max. 2MB)</p>
            </div>
          )}
        </Label>
        <Input 
          id="image-upload" 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {selectedFile && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 truncate max-w-[180px]">{selectedFile.name}</span>
          <span className="text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</span>
        </div>
      )}
      
      <div className="space-y-2">
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile}
          className="w-full flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Image
        </Button>
        
        <div className="text-xs text-gray-500">
          <p>Recently used images:</p>
          <div className="grid grid-cols-4 gap-1 mt-1">
            {[1, 2, 3, 4].map((_, i) => (
              <div 
                key={i}
                className="aspect-square bg-gray-100 rounded border border-gray-200"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
