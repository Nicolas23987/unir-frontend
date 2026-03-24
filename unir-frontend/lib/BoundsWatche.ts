
import { useMapEvents } from "react-leaflet";


export type MapBounds = {
  north: number;
  east: number;
  south: number;
  west: number;
}

export type BoundsWatcherProps = {
  setBounds: React.Dispatch<React.SetStateAction<MapBounds | null>>

}

export function BoundsWatcher({ setBounds }: BoundsWatcherProps) {

  useMapEvents({

    moveend: (e) => {
      const map = e.target
      const bounds = map.getBounds()
      const ne = bounds.getNorthEast()
      const sw = bounds.getSouthWest()

      setBounds({
        north: ne.lat,
        east: ne.lng,
        south: sw.lat,
        west: sw.lng
      })
    }
  })

  return null

}