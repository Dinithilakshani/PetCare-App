import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Slot, Stack } from "expo-router"
import "./../global.css"
import { AuthProvider } from "@/context/AuthContext"
import { LoaderProvider } from "@/context/LoaderContext"
import { initializeNotifications } from "@/services/notificationService"

const RootLayout = () => {
  useEffect(() => {
    initializeNotifications()
  }, [])
  return (
    <LoaderProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </LoaderProvider>
  )
}

export default RootLayout
