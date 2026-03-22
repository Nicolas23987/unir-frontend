
"use client"


import { MainNav } from "@/components/main-nav"
import { SearchHero } from "@/components/search-hero"
import { FeaturedListings } from "@/components/featured-listings"
import { HowItWorks } from "@/components/how-it-works"
import { useEffect, useState } from "react"

import "leaflet/dist/leaflet.css"
import L from "leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})


export default function HomePage() {

  const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  

  return (
    <>
      <MainNav />
      <main className="min-h-screen">
        <SearchHero />
        <FeaturedListings />
        <HowItWorks />
      </main>
    </>
  )
}