export type Category = {
  id: string
  name: string
  color: string
  created_at: string
}

export type Event = {
  id: string
  title: string
  description: string
  date_start: string       // ISO date string, e.g. "1066-10-14"
  date_end: string | null
  date_label: string       // Human-readable, e.g. "14 October 1066"
  lat: number
  lng: number
  location_name: string
  image_url: string | null
  category_id: string | null
  created_at: string
  // Joined via Supabase select("*, category:categories(*)")
  category?: Category | null
}

export type Relationship = {
  id: string
  source_id: string
  target_id: string
  label: string
  created_at: string
}

// Used when creating/editing an event (no id, created_at)
export type EventInsert = Omit<Event, 'id' | 'created_at' | 'category'>

// Used when creating a relationship
export type RelationshipInsert = Omit<Relationship, 'id' | 'created_at'>
