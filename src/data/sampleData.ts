
import { SampleClassified, SampleEvent } from '@/types';

// Sample content for unregistered users
export const sampleClassifieds: SampleClassified[] = [
  {
    id: 'sample-1',
    title: 'Toyota Hilux 2018 for Sale',
    description: 'Well-maintained pickup truck, single owner',
    price: 12500,
    location: 'Harare Central',
    images: ['https://source.unsplash.com/random/800x600/?truck']
  },
  {
    id: 'sample-2',
    title: '3-Bedroom House for Rent',
    description: 'Spacious family home in quiet neighborhood',
    price: 800,
    location: 'Borrowdale',
    images: ['https://source.unsplash.com/random/800x600/?house']
  },
  {
    id: 'sample-3',
    title: 'Professional Catering Services',
    description: 'Available for all events and occasions',
    price: null,
    location: 'All Harare',
    images: ['https://source.unsplash.com/random/800x600/?catering']
  }
];

export const sampleEvents: SampleEvent[] = [
  {
    id: 'sample-e1',
    title: 'Harare International Festival',
    description: 'Annual cultural celebration with music and arts',
    location: 'Harare Gardens',
    event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://source.unsplash.com/random/800x600/?festival'
  },
  {
    id: 'sample-e2',
    title: 'Business Networking Mixer',
    description: 'Connect with professionals across industries',
    location: 'Meikles Hotel',
    event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://source.unsplash.com/random/800x600/?networking'
  }
];
