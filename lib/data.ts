import { createClient } from '@/lib/supabase/server'
import type { Category, Event, Relationship } from '@/types'

// =============================================
// CATEGORIES
// =============================================

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw new Error(`getCategories: ${error.message}`)
  return data
}

// =============================================
// EVENTS
// =============================================

export async function getEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*, category:categories(*)')
    .order('date_start')

  if (error) throw new Error(`getEvents: ${error.message}`)
  return data
}

export async function getEventById(id: string): Promise<Event | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

/**
 * Returns events whose date_start falls within [from, to] (inclusive).
 * Both params are ISO date strings, e.g. "1066-10-14".
 */
export async function getEventsByDateRange(
  from: string,
  to: string
): Promise<Event[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*, category:categories(*)')
    .gte('date_start', from)
    .lte('date_start', to)
    .order('date_start')

  if (error) throw new Error(`getEventsByDateRange: ${error.message}`)
  return data
}

// =============================================
// RELATIONSHIPS
// =============================================

export async function getRelationships(): Promise<Relationship[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('relationships')
    .select('*')

  if (error) throw new Error(`getRelationships: ${error.message}`)
  return data
}

export async function getRelationshipsForEvent(
  eventId: string
): Promise<Relationship[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .or(`source_id.eq.${eventId},target_id.eq.${eventId}`)

  if (error) throw new Error(`getRelationshipsForEvent: ${error.message}`)
  return data
}
