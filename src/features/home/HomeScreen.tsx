import { StyleSheet, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Button, Screen } from '@/components/ui'
import { useAuth } from '@/features/auth/AuthProvider'
import { colors, spacing, typography } from '@/theme'

/** Placeholder signed-in screen; replaced by the real home in a later feature. */
export function HomeScreen() {
  const { t } = useTranslation()
  const { signOut } = useAuth()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.replace('/')
  }

  return (
    <Screen>
      <Text accessibilityRole="header" style={styles.title}>
        {t('home.title')}
      </Text>
      <Button label={t('home.signOut')} variant="outline" onPress={handleSignOut} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: { ...typography.heading, color: colors.textStrong, marginVertical: spacing['3xl'] },
})
