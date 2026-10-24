import { parseHttpsUrl } from '@/lib/config'

describe('parseHttpsUrl', () => {
  it('accepts https URLs', () => {
    expect(parseHttpsUrl('https://example.com/terms')).toBe('https://example.com/terms')
  })

  it.each([undefined, '', 'http://example.com', 'javascript:alert(1)', 'not a url'])(
    'rejects %p',
    (value) => {
      expect(parseHttpsUrl(value)).toBeNull()
    },
  )
})
