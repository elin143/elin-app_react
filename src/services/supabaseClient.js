import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gbzvfstwrillekxyzxvm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdienZmc3R3cmlsbGVreHl6eHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDU2ODMsImV4cCI6MjA5NzAyMTY4M30.qN1qa3N5ZX-X-rxYQ5Y0XmQ9Q_pPDDsIlA7I88Kn8Os";

export const supabase = createClient(supabaseUrl, supabaseKey);