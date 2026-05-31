export interface Product {
  id: string
  name: string
  slug: string
  category: string
  sub_category: string
  model_number: string
  description: string
  specs: Record<string, string>
  images: string[]
  datasheet_url?: string
  tags: string[]
  badge?: string
  is_featured: boolean
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  division: string
  product: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  product: string
  product_id: string
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  image?: string
  order: number
  is_visible: boolean
}

export interface SiteContent {
  id: string
  section: string
  key: string
  value: string
  type: 'text' | 'number' | 'image' | 'richtext'
  updated_at: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  description: string
  number: string
  icon: string
  is_visible: boolean
  order: number
}

export interface Client {
  id: string
  name: string
  type: string
  logo?: string
  is_visible: boolean
  order: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  text: string
  initials: string
  is_visible: boolean
  order: number
}
