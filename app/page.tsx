import { getEvents, getRelationships } from '@/lib/data'
import MapClient from '@/components/map/MapClient'

export default async function Page() {
  const [events, relationships] = await Promise.all([
    getEvents(),
    getRelationships(),
  ])

  return <MapClient events={events} relationships={relationships} />
}
