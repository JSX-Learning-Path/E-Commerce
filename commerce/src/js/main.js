import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import { createClient } from "@supabase/supabase-js";
import "bootstrap/dist/css/bootstrap.min.css";
const supabaseUrl = "https://cnljxmxeoluxnwrobmky.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubGp4bXhlb2x1eG53cm9ibWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzA0NTAsImV4cCI6MjA5MDQ0NjQ1MH0.ezNrRemQCYp1kgzz9TVxA0SCGoPD5SPmoFys-uA1HD8";

export const supabase = createClient(supabaseUrl, supabaseKey);
