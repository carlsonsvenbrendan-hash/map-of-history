'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import type { Event } from '@/types'

type Props = {
  events: Event[]
  selectedEventId: string | undefined
  onEventClick: (event: Event) => void
}

export default function LeafletMap({ events, selectedEventId, onEventClick }: Props) {
  return (
    <MapContainer
      center={[30, 15]}
      zoom={3}
      style={{ height: '100%', width: '100%', background: '#0f172a' }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Esri, US Forest Service"
        maxZoom={8}
      />

      {events.map(event => {
        const isSelected = selectedEventId === event.id
        const color = event.category?.color ?? '#6b7280'
        return (
          <CircleMarker
            key={event.id}
            center={[event.lat, event.lng]}
            radius={isSelected ? 14 : 9}
            pathOptions={{
              fillColor: color,
              color: isSelected ? '#fff' : color,
              weight: isSelected ? 2.5 : 1.5,
              opacity: 1,
              fillOpacity: isSelected ? 1 : 0.8,
            }}
            eventHandlers={{ click: () => onEventClick(event) }}
          >
            <Tooltip direction="top" offset={[0, -8]} permanent={false}>
              <span className="text-xs font-medium">{event.title}</span>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
