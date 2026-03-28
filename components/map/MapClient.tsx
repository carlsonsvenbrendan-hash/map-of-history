'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Map, GitFork } from 'lucide-react'
import type { Event, Relationship } from '@/types'
import EventModal from './EventModal'
import TimelineSlider from './TimelineSlider'

// Leaflet uses browser APIs (window, document) so it must not render on the server.
// dynamic() with ssr: false defers the import until the browser loads the component.
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-zinc-950 flex items-center justify-center">
      <span className="text-zinc-500 text-sm">Loading map…</span>
    </div>
  ),
})

type Props = {
  events: Event[]
  relationships: Relationship[]
}

export default function MapClient({ events, relationships }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Derive year bounds from the dataset
  const { minYear, maxYear } = useMemo(() => {
    const years = events.map(e => new Date(e.date_start).getUTCFullYear())
    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
    }
  }, [events])

  const [currentYear, setCurrentYear] = useState(minYear)

  const filteredEvents = useMemo(
    () =>
      events.filter(e => {
        const startYear = new Date(e.date_start).getUTCFullYear()
        const endYear = e.date_end ? new Date(e.date_end).getUTCFullYear() : startYear
        return startYear <= currentYear && currentYear <= endYear
      }),
    [events, currentYear]
  )

  // Quick lookup by id so EventModal can resolve related events
  const eventMap = useMemo(
    () => Object.fromEntries(events.map(e => [e.id, e])),
    [events]
  )

  const relatedRelationships = useMemo(
    () =>
      selectedEvent
        ? relationships.filter(
            r =>
              r.source_id === selectedEvent.id ||
              r.target_id === selectedEvent.id
          )
        : [],
    [selectedEvent, relationships]
  )

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      {/* Map fills the full container */}
      <LeafletMap
        events={filteredEvents}
        selectedEventId={selectedEvent?.id}
        onEventClick={setSelectedEvent}
      />

      {/* Top nav overlay */}
      <nav className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md rounded-full px-4 py-2 border border-zinc-700/60 shadow-xl">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-zinc-700 text-white"
        >
          <Map size={14} />
          Map
        </Link>
        <Link
          href="/graph"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-colors"
        >
          <GitFork size={14} />
          Graph
        </Link>
      </nav>

      {/* Timeline slider */}
      <TimelineSlider
        min={minYear}
        max={maxYear}
        value={currentYear}
        onChange={setCurrentYear}
      />

      {/* Event detail panel */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          relationships={relatedRelationships}
          eventMap={eventMap}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
