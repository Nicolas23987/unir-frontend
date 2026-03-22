import { useMapEvent, useMapEvents } from "react-leaflet";




export function ZoomController({ setShowArea }: { setShowArea: (v: boolean) => void }) {
    useMapEvents({
        zoomend: (e) => {
            const zoom = e.target.getZoom()

            if (zoom >=16) {
                setShowArea(true)
            } else {
                setShowArea(false)
            }
        }
    })
    return null
} 