import { createClient } from '@supabase/supabase-js'

const URL = 'https://whytggdupkzwqxqwmkst.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoeXRnZ2R1cGt6d3F4cXdta3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzMjg4MzIsImV4cCI6MTk5NjkwNDgzMn0.D26Jd3uf20MICJva2faHCYyk1xf5d_7Pf-qunMf7Jwg'

export const supabase = createClient(URL, API_KEY);