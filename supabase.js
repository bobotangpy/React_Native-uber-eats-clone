import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eqomhxnjxrwlpgbagfax.supabase.co";
// const supabaseUrl = process.env.REACT_NATIVE_SUPABASE_URL;
// const supabaseKey = process.env.REACT_NATIVE_SUPABASE_ANON_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODkzOTM4NiwiZXhwIjoxOTU0NTE1Mzg2fQ.8tclGBCAjTYvF2wRSh-2iA_5ozjNSRTDEHbd1RMAISM";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage,
});
