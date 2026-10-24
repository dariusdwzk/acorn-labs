import { StyleSheet, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen } from '@/components/ui'
import { colors, typography } from '@/theme'

/** Temporary body for screens that are not built yet. */
export function ComingSoon() {
  const { t } = useTranslation()
  return (
    <Screen>
      <Text accessibilityRole="header" style={styles.text}>
        {t('comingSoon')}
      </Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  text: { ...typography.body, color: colors.textBody, marginTop: 120 },
})
