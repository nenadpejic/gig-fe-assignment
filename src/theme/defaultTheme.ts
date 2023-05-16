declare module 'styled-components' {
  type BaseDefaultTheme = typeof defaultTheme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends BaseDefaultTheme {}
}

const defaultTheme = {
  colors: {
    error: '#fc8181',
  },
  fontSizes: {
    s: '0.75rem',
    m: '1rem',
    l: '1.5rem',
  },
  space: {
    xs: '0.25rem',
    s: '0.5rem',
    m: '1rem',
    l: '2rem',
    xl: '4rem',
  },
}

export default defaultTheme
