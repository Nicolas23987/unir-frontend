"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export function GoogleProvider({ children }: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId="499590508533-idlsif5stt5uculjoc7dqdc39mhgbhbt.apps.googleusercontent.com">
            {children}
        </GoogleOAuthProvider>
    );
}
