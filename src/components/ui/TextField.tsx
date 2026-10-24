import type { ReactNode } from 'react'
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native'
import { colors, radius, spacing, typography } from '@/theme'

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string
  /** Optional element rendered inside the field, at the right edge (e.g. a toggle). */
  trailing?: ReactNode
}

export function TextField({ label, trailing, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          {...inputProps}
        />
        {trailing}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 9 },
  label: { ...typography.label, color: colors.textBody },
  field: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.field,
  },
  input: { flex: 1, ...typography.input, color: colors.textStrong, padding: 0 },
})
