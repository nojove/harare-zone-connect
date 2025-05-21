
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, Banner, Event, Classified } from '@/types';

export const useHomeData = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredBanners, setFeaturedBanners] = useState<Banner[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [featuredClassifieds, setFeaturedClassifieds] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // Fetch categories - ensuring no duplicates with distinct selection
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');
          
        if (categoriesError) throw categoriesError;
        
        // Remove any potential duplicates by using Set with id
        const uniqueCategories = Array.from(
          new Map(categoriesData?.map(item => [item.id, item])).values()
        );
        
        // Fetch featured banners (homepage placement)
        const { data: bannersData, error: bannersError } = await supabase
          .from('banners')
          .select('*')
          .eq('placement', 'homepage')
          .eq('status', 'active')
          .gte('end_date', new Date().toISOString())
          .lte('start_date', new Date().toISOString())
          .limit(3);
          
        if (bannersError) throw bannersError;
        
        // Fetch upcoming events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'active')
          .gte('event_date', new Date().toISOString())
          .order('event_date', { ascending: true })
          .limit(3);
          
        if (eventsError) throw eventsError;
        
        // Fetch featured classifieds
        const { data: classifiedsData, error: classifiedsError } = await supabase
          .from('classifieds')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(4);
          
        if (classifiedsError) throw classifiedsError;
        
        setCategories(uniqueCategories || []);
        setFeaturedBanners(bannersData || []);
        setUpcomingEvents(eventsData || []);
        setFeaturedClassifieds(classifiedsData || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return {
    categories,
    featuredBanners,
    upcomingEvents,
    featuredClassifieds,
    loading
  };
};
