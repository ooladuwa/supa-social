import { User } from '@supabase/supabase-js';

export interface CustomUser extends User {
  name?: string;
  phoneNumber?: string;
  image?: string | null;
  bio?: string;
  address?: string;
}

export interface UserProfile {
  name: string;
  phoneNumber: string;
  image: string | null;
  bio: string;
  address: string;
}
