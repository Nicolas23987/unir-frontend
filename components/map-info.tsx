"use client"

import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { ZoomController } from "@/lib/zoomController"
import { useState } from "react"
import { BoundsWatcher, MapBounds } from "@/lib/BoundsWatche"

const universidad: [number, number] = [-0.9533683, -80.7456925]


const departamentos = [
  { id: 1, lat: -0.9380, lng: -80.7095, precio: "$30" },
  { id: 2, lat: -0.9360, lng: -80.7060, precio: "$45" },
]


const entradas = [
  { id: 1, lat: -0.953171, lng: -80.743847, name: "Puerta 2" },
  { id: 2, lat: -0.954890, lng: -80.7458851, name: "Puerta 1" },
  { id: 3, lat: -0.950634, lng: -80.746113, name: "Puerta 3" },
]

const areaCiudadela: [number, number][] = [

  [-0.955572, -80.744330],
  [-0.955671, -80.744365],
  [-0.956068, -80.745136],
  [-0.954918, -80.745882],
  [-0.955427, -80.746732],
  [-0.954263, -80.747548],
  [-0.954068, -80.747612],
  [-0.953548, -80.747904],
  [-0.953403, -80.747854],
  [-0.953253, -80.747738],
  [-0.951754, -80.746404],
  [-0.951657, -80.746341],
  [-0.951584, -80.746299],
  [-0.950614, -80.746169],
  [-0.949764, -80.746036],
  [-0.949835, -80.745493],
  [-0.949880, -80.745209],
  [-0.949935, -80.744730],
  [-0.949942, -80.744551],
  [-0.949958, -80.744332],
  [-0.949937, -80.744307],
  [-0.949888, -80.744287],
  [-0.948963, -80.744181],
  [-0.949104, -80.743316],
  [-0.949116, -80.742930],
  [-0.949729, -80.742233],
  [-0.950079, -80.742710],
  [-0.950143, -80.742764],
  [-0.950173, -80.742783],
  [-0.950219, -80.742798],
  [-0.950621, -80.742780],
  [-0.950697, -80.742772],
  [-0.950751, -80.742772],
  [-0.950794, -80.742779],
  [-0.950834, -80.742794],
  [-0.950906, -80.742827],
  [-0.951060, -80.742932],
  [-0.951210, -80.743047],
  [-0.951479, -80.743228],
  [-0.951596, -80.743294],
  [-0.951823, -80.743411],
  [-0.951823, -80.743415],
  [-0.952028, -80.743492],
  [-0.952260, -80.743569],
  [-0.952405, -80.743604],
  [-0.952856, -80.743660],
  [-0.952893, -80.743660],
  [-0.952961, -80.743672],
  [-0.952994, -80.743691],
  [-0.953069, -80.743845],
  [-0.953177, -80.743842],
  [-0.953145, -80.743778],
  [-0.953138, -80.743723],
  [-0.953132, -80.743673],
  [-0.953156, -80.743382],
  [-0.954393, -80.743945],
  [-0.954564, -80.743996],
  [-0.955318, -80.744130],
  [-0.955402, -80.744153],
  [-0.955525, -80.744211],
  [-0.955527, -80.744275],
  [-0.955570, -80.744356],
  [-0.955636, -80.744363],
  [-0.955656, -80.744344],

]




export default function MapInfo() {

  const [bounds, setBounds] = useState<MapBounds | null>(null)

  const BondsInWatcher = departamentos.filter(dep => {
    if (!bounds) return true
    // console.log("Comparando dep:", dep, "con bounds:", bounds)
    return (
      dep.lat <= bounds.north &&
      dep.lat >= bounds.south &&
      dep.lng <= bounds.east &&
      dep.lng >= bounds.west
    )
  }
  )

  const [showArea, setShowArea] = useState(true)

  return (
    <MapContainer
      center={universidad}
      zoom={15}
      style={{ height: "100%", width: "100%", borderRadius: '20px' }}
    >
      <ZoomController setShowArea={setShowArea} />
      <BoundsWatcher setBounds={setBounds} />
      <Polygon
        positions={areaCiudadela}
        pathOptions={{
          color: "red",
          weight: 3,
          dashArray: "6,6", // 👈 línea punteada como Google Maps
          fillColor: "red",
          fillOpacity: 0.1, // 👈 relleno suave
        }}
      />
      <TileLayer
        attribution='© OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🎓 Resaltar Universidad */}
      <Marker position={universidad}>
        <Popup>
          <b>Universidad Laica Eloy Alfaro</b>
        </Popup>
      </Marker>

      {/* <Circle
        center={universidad}
        radius={500} // 500 metros alrededor
        pathOptions={{ color: "blue" }}
      /> */}

      {/* 🏠 Marcadores tipo Airbnb */}
      {
        departamentos.map((dep) => {
          const customIcon = L.divIcon({
            html: `
            <div style="
              background:#ff385c;
              color:white;
              padding:6px 12px;
              border-radius:20px;
              font-weight:bold;
            ">
              ${dep.precio}
            </div>
          `,
            className: "",
          })

          return (
            <Marker
              key={dep.id}
              position={[dep.lat, dep.lng]}
              icon={customIcon}
            >
              <Popup>
                Departamento {dep.precio}
              </Popup>
            </Marker>
          )
        })}


      {
        showArea && (

          entradas.map((dep) => {
            const customIcon = L.divIcon({
              html: `
              <div class="cartel">
              ${dep.name}
            </div>
          `,
              className: "",
              iconSize: [100, 40],     // tamaño aproximado del cartel
              iconAnchor: [50, 50],
            })

            return (
              <Marker
                key={dep.id}
                position={[dep.lat, dep.lng]}
                icon={customIcon}
              >
                <Popup>
                  Departamento {dep.name}
                </Popup>
              </Marker>
            )
          }))}

    </MapContainer>
  )
}
