
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Image, Type, Square, Circle, Pencil, Palette, Eye, Download, Upload } from 'lucide-react';
import ColorPicker from './ColorPicker';
import TextControls from './TextControls';
import ShapeControls from './ShapeControls';
import ImageUploader from './ImageUploader';
import CanvasEditor from './CanvasEditor';

export type EditorCategory = 'business' | 'classifieds' | 'events' | 'personal';
export type EditorTemplate = 'default' | 'sale' | 'grand-opening' | 'lost-found' | 'wedding' | 'church' | 'announcement';

interface DesignEditorProps {
  category: EditorCategory;
  onSave?: (data: any) => void;
  onPublish?: (data: any) => void;
}

interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'required';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  style?: any;
  editable?: boolean;
  locked?: boolean;
}

const DesignEditor: React.FC<DesignEditorProps> = ({ 
  category,
  onSave,
  onPublish
}) => {
  // Design state
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState<string>('select');
  const [template, setTemplate] = useState<EditorTemplate>('default');
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    date: '',
    contactMethod: '',
    description: ''
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Auto-save timer
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        handleSave();
      }, 30000); // Auto save every 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, [elements, formData, isDirty]);

  // Initialize with required elements based on category
  useEffect(() => {
    initializeRequiredFields();
  }, [category, template]);

  const initializeRequiredFields = () => {
    const requiredElements: DesignElement[] = [
      {
        id: 'title',
        type: 'required',
        content: formData.title || 'Title',
        x: 10,
        y: 10,
        width: 280,
        height: 40,
        rotation: 0,
        editable: true,
        locked: false,
        style: { fontSize: '24px', fontWeight: 'bold', color: '#000000' }
      },
      {
        id: 'location',
        type: 'required',
        content: formData.location || 'Location',
        x: 10,
        y: 60,
        width: 280,
        height: 30,
        rotation: 0,
        editable: true,
        locked: false,
        style: { fontSize: '16px', color: '#666666' }
      },
      {
        id: 'description',
        type: 'required',
        content: formData.description || 'Description',
        x: 10,
        y: 100,
        width: 280,
        height: 80,
        rotation: 0,
        editable: true,
        locked: false,
        style: { fontSize: '14px', color: '#333333' }
      }
    ];
    
    // Add category specific required elements
    if (category === 'events') {
      requiredElements.push({
        id: 'date',
        type: 'required',
        content: formData.date || 'Event Date',
        x: 10,
        y: 190,
        width: 280,
        height: 30,
        rotation: 0,
        editable: true,
        locked: false,
        style: { fontSize: '16px', fontWeight: 'bold', color: '#333333' }
      });
    }
    
    if (category === 'classifieds') {
      requiredElements.push({
        id: 'price',
        type: 'required',
        content: 'Price',
        x: 10,
        y: 190,
        width: 280,
        height: 30,
        rotation: 0,
        editable: true,
        locked: false,
        style: { fontSize: '18px', fontWeight: 'bold', color: '#007700' }
      });
    }
    
    setElements(requiredElements);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update the corresponding element on canvas if it exists
    if (elements.find(el => el.id === name)) {
      setElements(prev => prev.map(el => 
        el.id === name ? { ...el, content: value } : el
      ));
    }
    
    setIsDirty(true);
  };

  const handleToolChange = (tool: string) => {
    setCurrentTool(tool);
  };

  const handleTemplateChange = (newTemplate: EditorTemplate) => {
    setTemplate(newTemplate);
    // Template would load predefined elements
  };

  const handleSave = () => {
    // Save the current state
    const designData = {
      elements,
      formData,
      category,
      template,
      lastSaved: new Date().toISOString()
    };
    
    console.log('Saving design:', designData);
    
    if (onSave) {
      onSave(designData);
    }
    
    setIsDirty(false);
  };

  const handlePublish = () => {
    if (onPublish) {
      onPublish({
        elements,
        formData,
        category,
        template,
        publishedAt: new Date().toISOString()
      });
    }
  };

  const getCategoryColor = () => {
    const colors = {
      'business': 'blue',
      'classifieds': 'amber',
      'events': 'green',
      'personal': 'orange'
    };
    return colors[category] || 'gray';
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4">
      {/* Editor sidebar */}
      <div className="w-full lg:w-64 bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Design Tools</h2>
        
        <Tabs defaultValue="required" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="required" className="flex-1">Required</TabsTrigger>
            <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
            <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="required" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="title">Title (Required)</Label>
                <Input 
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Enter title"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category (Required)</Label>
                <Input 
                  id="category"
                  name="category" 
                  value={formData.category}
                  onChange={handleFormChange}
                  placeholder="Enter category"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location (Required)</Label>
                <Input 
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="Enter location"
                />
              </div>
              
              {category === 'events' && (
                <div>
                  <Label htmlFor="date">Date (Required)</Label>
                  <Input 
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleFormChange}
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="contactMethod">Contact Method (Required)</Label>
                <Input 
                  id="contactMethod"
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleFormChange}
                  placeholder="Enter contact method"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (Required)</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Enter description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button 
                variant={currentTool === 'text' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleToolChange('text')}
              >
                <Type className="h-5 w-5 mb-1" />
                <span className="text-xs">Text</span>
              </Button>
              
              <Button 
                variant={currentTool === 'image' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleToolChange('image')}
              >
                <Image className="h-5 w-5 mb-1" />
                <span className="text-xs">Image</span>
              </Button>
              
              <Button 
                variant={currentTool === 'shape' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleToolChange('shape')}
              >
                <Square className="h-5 w-5 mb-1" />
                <span className="text-xs">Shape</span>
              </Button>
              
              <Button 
                variant={currentTool === 'draw' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleToolChange('draw')}
              >
                <Pencil className="h-5 w-5 mb-1" />
                <span className="text-xs">Draw</span>
              </Button>
              
              <Button 
                variant={currentTool === 'color' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleToolChange('color')}
              >
                <Palette className="h-5 w-5 mb-1" />
                <span className="text-xs">Colors</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => console.log('Upload')}
              >
                <Upload className="h-5 w-5 mb-1" />
                <span className="text-xs">Upload</span>
              </Button>
            </div>
            
            {currentTool === 'text' && <TextControls />}
            {currentTool === 'shape' && <ShapeControls />}
            {currentTool === 'color' && <ColorPicker />}
            {currentTool === 'image' && <ImageUploader />}
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={template === 'sale' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleTemplateChange('sale')}
              >
                <div className={`w-full h-12 rounded bg-red-100 mb-1 flex items-center justify-center text-xs`}>
                  Sale
                </div>
                <span className="text-xs">Sale</span>
              </Button>
              
              <Button 
                variant={template === 'grand-opening' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleTemplateChange('grand-opening')}
              >
                <div className={`w-full h-12 rounded bg-blue-100 mb-1 flex items-center justify-center text-xs`}>
                  Opening
                </div>
                <span className="text-xs">Grand Opening</span>
              </Button>
              
              <Button 
                variant={template === 'lost-found' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleTemplateChange('lost-found')}
              >
                <div className={`w-full h-12 rounded bg-yellow-100 mb-1 flex items-center justify-center text-xs`}>
                  Lost & Found
                </div>
                <span className="text-xs">Lost & Found</span>
              </Button>
              
              <Button 
                variant={template === 'wedding' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleTemplateChange('wedding')}
              >
                <div className={`w-full h-12 rounded bg-pink-100 mb-1 flex items-center justify-center text-xs`}>
                  Wedding
                </div>
                <span className="text-xs">Wedding</span>
              </Button>
              
              <Button 
                variant={template === 'church' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleTemplateChange('church')}
              >
                <div className={`w-full h-12 rounded bg-purple-100 mb-1 flex items-center justify-center text-xs`}>
                  Church
                </div>
                <span className="text-xs">Church Event</span>
              </Button>
              
              <Button 
                variant={template === 'announcement' ? 'default' : 'outline'} 
                className="flex flex-col items-center p-2 h-auto"
                onClick={() => handleTemplateChange('announcement')}
              >
                <div className={`w-full h-12 rounded bg-green-100 mb-1 flex items-center justify-center text-xs`}>
                  Announce
                </div>
                <span className="text-xs">Announcement</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 space-y-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => handleSave()}
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          
          <Button 
            variant="default" 
            className="w-full flex items-center gap-2"
            onClick={() => handlePublish()}
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          
          <Button 
            variant="default" 
            className={`w-full bg-category-${category} hover:bg-category-${category}/80 flex items-center gap-2`}
            onClick={() => handlePublish()}
          >
            Publish
          </Button>
        </div>
      </div>
      
      {/* Preview canvas */}
      <div className="flex-grow">
        <Card className="p-4 h-full">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{category.charAt(0).toUpperCase() + category.slice(1)} Design</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Mobile preview')}
              >
                Mobile
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Tablet preview')}
              >
                Tablet
              </Button>
            </div>
          </div>
          
          <div 
            ref={canvasRef}
            className="bg-white border rounded-md w-full h-[500px] relative overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}
          >
            {elements.map(element => (
              <div
                key={element.id}
                style={{
                  position: 'absolute',
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                  transform: `rotate(${element.rotation}deg)`,
                  ...element.style,
                  border: selectedElement === element.id ? '2px solid #3b82f6' : 'none',
                  padding: '5px',
                  cursor: 'move',
                  userSelect: 'none'
                }}
                onClick={() => setSelectedElement(element.id)}
              >
                {element.content}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DesignEditor;
