
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BusinessAdInput: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally save the data to Supabase
    // For now we just show a toast notification
    toast({
      title: "Advertisement Submitted",
      description: "Your ad has been submitted for review. Once approved, it will be published.",
    });
    
    setTimeout(() => {
      navigate('/business');
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Create Business Advertisement</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Advertisement Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input id="title" placeholder="Enter advertisement title" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select 
                  id="category" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="services">Services</option>
                  <option value="for-sale">For Sale</option>
                  <option value="jobs">Jobs</option>
                  <option value="housing">Housing</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea id="description" placeholder="Describe your advertisement" className="min-h-[150px]" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input id="location" placeholder="Enter your location" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-medium">Contact Information</label>
                <Input id="contact" placeholder="Phone or email" required />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">Submit Advertisement</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BusinessAdInput;
