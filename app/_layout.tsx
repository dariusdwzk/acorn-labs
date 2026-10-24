import '@/i18n'
import { useEffect } from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useAppFonts } from '@/theme'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const fontsReady = useAppFonts()

  useEffect(() => {
    if (fontsReady) void SplashScreen.hideAsync()
  }, [fontsReady])

  if (!fontsReady) return null

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
