import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://tyqohlsrstgyzvbbqkat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cW9obHNyc3RneXp2YmJxa2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDcyOTksImV4cCI6MjAyOTQ4MzI5OX0.lGo1dNJO0Ye1znZWRC3IvmY08EeWuNo1OyIzGP_uyos"
);
