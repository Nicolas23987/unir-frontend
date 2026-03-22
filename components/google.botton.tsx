// google.button.tsx
"use client";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";

interface CustomGoogleButtonProps {
  onAuthSuccess: (userData: any, credential: string) => void;
  onAuthError: (error: string) => void;
}

export default function CustomGoogleButton({ 
  onAuthSuccess, 
  onAuthError 
}: CustomGoogleButtonProps) {
  // 👇 función para enviar el token al servidor
  const sendCredentialToServer = async (credential: string, userData: any) => {
    try {
      const res = await fetch("http://localhost:3001/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });

      if (!res.ok) {
        throw new Error("Error al autenticar con el servidor");
      }

      const serverData = await res.json();
      console.log("Respuesta del servidor:", serverData);

      // Notificar al modal sobre el éxito de la autenticación
      onAuthSuccess({
        ...userData,
        serverData: serverData // Incluir datos del servidor (como profileComplete)
      }, credential);

    } catch (error) {
      console.error("Error enviando credential:", error);
      onAuthError("Error al autenticar con el servidor");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 flex justify-center items-center bg-black border border-gray-300 hover:bg-gray-50 relative overflow-hidden h-12"
      >
        {/* Logo de Google */}
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..." />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77..." />
        </svg>
        <span>Continuar con Google</span>

        {/* Login invisible encima */}
        <div className="absolute inset-0 opacity-0">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                console.log("Token recibido:", credentialResponse.credential);
                
                // Decodificar para obtener info del usuario
                const userData = jwtDecode(credentialResponse.credential);
                console.log("Usuario Google:", userData);

                // 👉 Enviar token al servidor y notificar al modal
                sendCredentialToServer(credentialResponse.credential, userData);
              } else {
                console.error("No se recibió credential de Google");
                onAuthError("No se pudo obtener la credencial de Google");
              }
            }}
            onError={() => {
              console.log("Error al iniciar sesión con Google");
              onAuthError("Error al iniciar sesión con Google");
            }}
            useOneTap={false}
          />
        </div>
      </Button>
    </div>
  );
}