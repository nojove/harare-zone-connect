
import { FC, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calendar, Image, Video, Link2, ArrowLeft, Save, Eye, Send } from 'lucide-react';

const BannerDesigner: FC = () => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState<string>('event');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [placement, setPlacement] = useState<string>('home');
  const [duration, setDuration] = useState<number>(7);
  const [price, setPrice] = useState<number>(10);

  // Calculate price based on placement and duration
  const calculatePrice = () => {
    const basePrice = placement === 'home' ? 15 : placement === 'category' ? 10 : 5;
    return basePrice * duration;
  };

  // Update price when placement or duration changes
  const handlePlacementChange = (value: string) => {
    setPlacement(value);
    setPrice(calculatePrice());
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0]);
    setPrice(calculatePrice());
  };

  const handleSave = () => {
    console.log('Saving banner design:', { template, title, description, placement, duration });
    // Here you would save the design to a draft
  };

  const handlePreview = () => {
    console.log('Previewing banner:', { template, title, description });
    // Here you would show a preview modal or navigate to a preview page
  };

  const handleSubmit = () => {
    console.log('Submitting banner:', { template, title, description, placement, duration });
    // Here you would submit the banner for review/publish
    navigate('/');
  };

  return (
    <MainLayout category="banners" showTopNavigation={false}>
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Design Your Banner</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel - Tools */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Banner Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template">Template Type</Label>
                  <Select defaultValue={template} onValueChange={setTemplate}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Banner Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter banner title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter banner description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="placement">Banner Placement</Label>
                  <Select defaultValue={placement} onValueChange={handlePlacementChange}>
                    <SelectTrigger id="placement">
                      <SelectValue placeholder="Select placement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Page (Premium)</SelectItem>
                      <SelectItem value="category">Category Top</SelectItem>
                      <SelectItem value="bottom">Bottom Banner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="duration">Duration (Days): {duration}</Label>
                  </div>
                  <Slider 
                    defaultValue={[7]} 
                    min={1} 
                    max={30} 
                    step={1} 
                    onValueChange={handleDurationChange} 
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estimated Price:</span>
                    <span className="text-xl font-bold text-green-600">${price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Final price may vary based on additional options selected
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>

                <div>
                  <Label htmlFor="video">Video URL</Label>
                  <Input id="video" placeholder="Enter YouTube or Vimeo URL" />
                </div>

                <div>
                  <Label htmlFor="link">Website Link</Label>
                  <Input id="link" placeholder="https://" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Panel - Preview */}
          <div className="md:col-span-2">
            <Card className="min-h-[500px]">
              <CardHeader>
                <CardTitle>Banner Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 min-h-[400px]">
                {title ? (
                  <div className={`w-full max-w-2xl p-6 rounded-lg ${
                    template === 'event' ? 'bg-category-events bg-opacity-20' : 
                    template === 'sale' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    {description && <p className="text-gray-700 mb-4">{description}</p>}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {template === 'event' && <div className="inline-flex items-center px-2 py-1 rounded bg-white text-xs"><Calendar className="h-3 w-3 mr-1" /> Date: TBD</div>}
                      <div className="inline-flex items-center px-2 py-1 rounded bg-white text-xs">Location: Harare</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="mb-2">Your banner preview will appear here</p>
                    <p className="text-sm">Start by selecting a template and entering a title</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button onClick={handleSubmit}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BannerDesigner;
