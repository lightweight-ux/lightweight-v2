// theme.js
import { createTheme } from '@mui/material/styles'
import site from './content/siteContent'

const brand = site.brand?.colors || {}
const primaryColor = brand.primary || '#FFB300'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:  { main: primaryColor },
    secondary:{ main: brand.secondary || '#4FC3F7' },
    background: {
      default: brand.background || '#0b0f0d',
      paper:   brand.paper || '#101614'
    }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ['Inter','Segoe UI','Roboto','Helvetica','Arial','sans-serif'].join(','),
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    button: { textTransform: 'none', fontWeight: 700 },

    // Custom script style you can also spread via sx: {...theme.typography.brandScript}
    brandScript: {
      fontFamily: ['Sacramento','Inter','Segoe UI','Roboto','Helvetica','Arial','sans-serif'].join(','),
      color: primaryColor,
      fontWeight: 400,
      fontSize: '2.5rem',     // tweak as you like
      lineHeight: 1.1,
      letterSpacing: '0.01em'
    }
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 999, paddingInline: 20 } } },
    MuiPaper:  { styleOverrides: { root: { backgroundImage: 'none' } } },

    // Enable <Typography variant="brandScript" />
    MuiTypography: {
      variants: [
        {
          props: { variant: 'brandScript' },
          style: ({ theme }) => ({
            ...theme.typography.brandScript,
            color: theme.palette.primary.main
          })
        }
      ]
    }
  }
})

export default theme
