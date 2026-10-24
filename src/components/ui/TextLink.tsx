import { Pressable, StyleSheet, Text } from 'react-native'
import { colors, typography } from '@/theme'

type Props = {
  label: string
  onPress: () => void
  strong?: boolean
}

export function TextLink({ label, onPress, strong = false }: Props) {
  return (
    <Pressable accessibilityRole="link" accessibilityLabel={label} hitSlop={12} onPress={onPress}>
      <Text style={strong ? styles.strong : styles.regular}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  regular: { ...typography.link, color: colors.link },
  strong: { ...typography.linkStrong, color: colors.link },
})
