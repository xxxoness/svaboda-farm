import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const THEME_KEY = 'svaboda_theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => window.localStorage.getItem(THEME_KEY) || 'dark')

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
