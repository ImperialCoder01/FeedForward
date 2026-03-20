
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://czzxoyxdyhrupgdmazpu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6enhveXhkeWhydXBnZG1henB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTA0NDMsImV4cCI6MjA4OTU2NjQ0M30.Rqusfm10PNX3ldiQLcWgsGK68MLHQp08O5vhg4Q2UyE';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
