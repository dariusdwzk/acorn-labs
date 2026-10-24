import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { LabeledDivider, Screen, SocialButton, TextLink } from '@/components/ui'
import { colors, minTouchTarget, spacing, typography } from '@/theme'
import AcornLogo from '../../../assets/svg/acorn-logo.svg'
import BackChevron from '../../../assets/svg/back-chevron.svg'
import { LoginForm, type Credentials } from './LoginForm'

// Figma one-off layout values (Login frame 141:370).
const NAV_HEIGHT = 64
const BODY_TOP = 18
const SECTION_GAP = 36

export function LoginScreen() {
  const { t } = useTranslation()
  const router = useRouter()

  function goBack() {
    if (router.canGoBack()) router.back()
    else router.replace('/welcome')
  }

  // Real authentication is wired in Phase 8 (useLogin). Until then submitting does nothing.
  function handleSubmit(_credentials: Credentials) {}

  return (
    <Screen>
      <View style={styles.nav}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('login.back')}
          onPress={goBack}
          style={styles.back}
        >
          <BackChevron />
        </Pressable>
      </View>

      <View style={styles.body}>
        <View style={styles.wordmark}>
          <AcornLogo />
          <Text style={styles.wordmarkText}>{t('login.wordmark')}</Text>
        </View>

        <View style={styles.intro}>
          <Text accessibilityRole="header" style={styles.title}>
            {t('login.title')}
          </Text>
          <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
        </View>

        <LoginForm
          onSubmit={handleSubmit}
          onForgotPassword={() => router.push('/forgot-password')}
        />

        <View style={styles.social}>
          <LabeledDivider label={t('login.orContinueWith')} />
          <View style={styles.providers}>
            <SocialButton
              provider="apple"
              label={t('login.apple')}
              onPress={() => Alert.alert(t('login.socialSoon'))}
            />
            <SocialButton
              provider="google"
              label={t('login.google')}
              onPress={() => Alert.alert(t('login.socialSoon'))}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('login.noAccount')}</Text>
        <TextLink
          strong
          label={t('login.createAccount')}
          onPress={() => router.push('/register')}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  nav: { height: NAV_HEIGHT, justifyContent: 'center' },
  back: { width: minTouchTarget, height: minTouchTarget, justifyContent: 'center' },
  body: { flexGrow: 1, paddingTop: BODY_TOP, gap: SECTION_GAP },
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  wordmarkText: { ...typography.wordmark, color: colors.textBody },
  intro: { gap: spacing.md },
  title: { ...typography.heading, color: colors.textStrong },
  subtitle: { ...typography.body, color: colors.textBody },
  social: { gap: 22 },
  providers: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 38,
    paddingBottom: spacing['2xl'],
  },
  footerText: {
    ...typography.link,
    fontFamily: typography.body.fontFamily,
    color: colors.textBody,
  },
})
