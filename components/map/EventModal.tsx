'use client'

import { X, MapPin, Calendar, Link2 } from 'lucide-react'
import type { Event, Relationship } from '@/types'

type Props = {
  event: Event
  relationships: Relationship[]
  eventMap: Record<string, Event>
  onClose: () => void
}

export default function EventModal({ event, relationships, eventMap, onClose }: Props) {
  const color = event.category?.color ?? '#6b7280'

  return (
    <div className="absolute top-0 right-0 h-full w-96 max-w-full bg-zinc-900/95 backdrop-blur-sm border-l border-zinc-800 overflow-y-auto z-[1000] flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-zinc-800 gap-3">
        <div className="flex-1 min-w-0">
          <span
            className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
            style={{
              backgroundColor: `${color}25`,
              color,
              border: `1px solid ${color}40`,
            }}
          >
            {event.category?.name ?? 'Uncategorised'}
          </span>
          <h2 className="text-base font-semibold text-white leading-snug">
            {event.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 mt-0.5 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-5 flex-1">
        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-sm text-zinc-400">
          <span className="flex items-center gap-2">
            <Calendar size={13} className="shrink-0" />
            {event.date_label}
          </span>
          {event.location_name && (
            <span className="flex items-center gap-2">
              <MapPin size={13} className="shrink-0" />
              {event.location_name}
            </span>
          )}
        </div>

        {/* Image */}
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full rounded-lg object-cover max-h-44"
          />
        )}

        {/* Description */}
        <p className="text-sm text-zinc-300 leading-relaxed">{event.description}</p>

        {/* Related events */}
        {relationships.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
              <Link2 size={11} />
              Related Events
            </h3>
            <ul className="flex flex-col gap-2">
              {relationships.map(rel => {
                const other =
                  rel.source_id === event.id
                    ? eventMap[rel.target_id]
                    : eventMap[rel.source_id]
                if (!other) return null
                return (
                  <li
                    key={rel.id}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span
                      className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: other.category?.color ?? '#6b7280' }}
                    />
                    <span>
                      <span className="text-zinc-500 italic">{rel.label} </span>
                      <span className="text-zinc-200">{other.title}</span>
                      <span className="text-zinc-500 ml-1 text-xs">
                        ({other.date_label})
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
