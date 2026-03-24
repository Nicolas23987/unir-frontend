"use client"



import { useEffect, useState } from "react";
import { useLocationStore } from "@/store/locationStore"; // Importa tu store Zustand si es el caso

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { setLocation, setError } = useLocationStore();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, [setLocation, setError]);

  return (
    <div>
      <h1>Mi sitio</h1>
      {loading && <p>Cargando ubicación...</p>}
      {setError && <p>{setError}</p>} {/* Muestra el mensaje de error si hay */}
    </div>
  );
}
