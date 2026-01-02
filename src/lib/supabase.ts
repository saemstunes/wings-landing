import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Types for our database tables
export interface Product {
  id: string
  name: string
  brand: string
  model: string | null
  category: string
  subcategory: string | null
  power_kva: number | null
  power_kw: number | null
  engine_brand: string | null
  engine_model: string | null
  engine_type: string | null
  cylinders: number | null
  cooling_type: string | null
  starting_type: string | null
  fuel_type: string | null
  voltage: string | null
  frequency: string | null
  rpm: string | null
  phase_type: string | null
  mounting_type: string | null
  weight_kg: number | null
  dimensions: string | null
  key_features: string[] | null
  short_description: string | null
  full_description: string | null
  applications: string[] | null
  service_interval_hours: number | null
  maintenance_notes: string | null
  compatible_with: string[] | null
  price: number | null
  currency: string
  stock_quantity: number
  primary_image_url: string | null
  additional_images: string[] | null
  status: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  category: string
  service_type: string
  description: string
  duration_hours: number | null
  frequency: string | null
  interval_hours: number | null
  applicable_products: string[] | null
  equipment_brands: string[] | null
  base_price: number | null
  price_type: string | null
  currency: string
  requirements: string[] | null
  included_items: string[] | null
  tools_required: string[] | null
  parts_included: boolean
  advance_notice_days: number
  available_locations: string[] | null
  mobile_service: boolean
  status: string
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string
  message: string
  request_type: string | null
  product_name: string | null
  request_metadata: any | null
  submission_date: string
  formspree_submitted: boolean
  has_attachment: boolean
  created_at: string
  image_storage_url: string | null
}

export interface Quote {
  id: string
  contact_submission_id: number | null
  quote_number: string
  amount: number | null
  status: string
  valid_until: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

// Helper functions
export async function fetchActiveProducts(limit: number = 6) {
  const { data, error } = await supabase
    .from('product_catalog')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Product[]
}

export async function fetchActiveServices() {
  const { data, error } = await supabase
    .from('service_catalog')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Service[]
}

export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  request_type?: string
  product_name?: string
}) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{
      ...formData,
      submission_date: new Date().toISOString(),
      formspree_submitted: false,
      has_attachment: false
    }])
    .select()

  if (error) throw error
  return data as ContactSubmission[]
}

export async function requestQuote(quoteData: {
  contact_submission_id?: number
  quote_number: string
  amount?: number
  status?: string
  valid_until?: string
  notes?: string
}) {
  const { data, error } = await supabase
    .from('quotes')
    .insert([quoteData])
    .select()

  if (error) throw error
  return data as Quote[]
}
