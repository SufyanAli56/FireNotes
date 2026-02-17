// src/infrastructure/supabase/supabaseClient.js
import { createClient } from "@supabase/supabase-js"

// Replace these with your Supabase project credentials
const SUPABASE_URL = "https://bkofuhbiowvwyltqovbk.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_2T4_jb7JogSqhsZIr8b8Dw_Hs9H-bKQ"

// Create a single Supabase client for your app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
