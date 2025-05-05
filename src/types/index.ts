
// Type definitions for the app
export type UserRole = 'user' | 'agent' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  cell_number: string;
  location: string;
  business_name?: string;
  service_type?: string;
  bio?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  is_visible: boolean;
  allow_call: boolean;
  allow_sms: boolean;
  allow_email: boolean;
}

export interface DirectoryListing {
  id: string;
  profile_id: string;
  name: string;
  cell_number: string;
  location: string;
  business_name?: string;
  service_type?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
  is_visible: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  type: string;
  created_at: string;
  icon_name?: string;
}

export interface Classified {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  price?: number;
  location: string;
  contact_info: string;
  images?: string[];
  category_id?: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  status: string;
  is_flagged: boolean;
}

export interface Event {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  end_date?: string;
  image?: string;
  has_rsvp: boolean;
  map_location?: any;
  created_at: string;
  updated_at: string;
  status: string;
  is_flagged: boolean;
}

export interface Banner {
  id: string;
  profile_id: string;
  title: string;
  content: string;
  image?: string;
  video?: string;
  placement: string;
  category_id?: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  status: string;
  is_flagged: boolean;
}

export interface AgentCode {
  id: string;
  agent_id: string;
  code: string;
  created_at: string;
  is_active: boolean;
}

export interface Transaction {
  id: string;
  profile_id: string;
  amount: number;
  currency: string;
  item_type: string;
  item_id: string;
  agent_code_id?: string;
  status: string;
  payment_method: string;
  payment_reference?: string;
  created_at: string;
}
