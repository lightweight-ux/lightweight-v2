// theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import site from './content/siteContent';

const brand = site.brand?.colors || {};
const primaryColor = brand.primary || '#FFB300';

let base = createTheme({
  palette: {
    mode: 'dark',
    primary:  { main: primaryColor },
    secondary:{ main: brand.secondary || '#4FC3F7' },
    background: {
      default: brand.background || '#0b0f0d',
      paper:   brand.paper || '#101614',
    },
  },
  shape: { borderRadius: 16 },

  // -------- Typography: clamp() + strong mobile defaults --------
  typography: {
    fontFamily: ['Inter','Segoe UI','Roboto','Helvetica','Arial','sans-serif'].join(','),
    // clamp(min, fluid vw, max)
    h1: { fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, fontSize: 'clamp(2rem, 4.8vw, 3.25rem)' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2,  fontSize: 'clamp(1.625rem, 3.6vw, 2.5rem)' },
    h3: { fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.25, fontSize: 'clamp(1.375rem, 3vw, 2rem)' },
    body1: { fontSize: 'clamp(0.98rem, 0.4vw + 0.9rem, 1.05rem)', lineHeight: 1.7 },
    body2: { fontSize: 'clamp(0.9rem, 0.3vw + 0.85rem, 0.98rem)', lineHeight: 1.65 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: 0.2 },

    // Custom script style (also responsive)
    brandScript: {
      fontFamily: ['Sacramento','Inter','Segoe UI','Roboto','Helvetica','Arial','sans-serif'].join(','),
      color: primaryColor,
      fontWeight: 400,
      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
      lineHeight: 1.1,
      letterSpacing: '0.01em',
    },

    // Prevent long words/URLs from causing horizontal overflow
    allVariants: {
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },
  },

  components: {
    // Global CSS fixes for mobile viewport/overflow and media scaling
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '*, *::before, *::after': { boxSizing: 'border-box', minWidth: 0 },
        html: {
          height: '100%',
          width: '100%',
          WebkitTextSizeAdjust: '100%',
          textSizeAdjust: '100%',
          overscrollBehaviorY: 'none',
          // Prevent iOS rubber-band causing weird layout jumps on fixed headers
          scrollPaddingTop: theme.spacing(1),
        },
        body: {
          height: '100%',
          width: '100%',
          margin: 0,
          overflowX: 'hidden', // key for “page is cut off horizontally”
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          WebkitTapHighlightColor: 'transparent',
        },
        '#root': { minHeight: '100%', display: 'flex', flexDirection: 'column' },

        // Media elements never overflow the viewport width
        'img, svg, video, canvas, iframe': {
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
        },

        // Avoid iOS zoom on inputs < 16px
        'input, select, textarea': { fontSize: '16px' },

        // Utility to use dynamic viewport height on mobile (use in your sx/class)
        '.min-h-100dvh': { minHeight: '100dvh' },
      }),
    },

    // Enable <Typography variant="brandScript" />
    MuiTypography: {
      variants: [
        {
          props: { variant: 'brandScript' },
          style: ({ theme }) => ({
            ...theme.typography.brandScript,
            color: theme.palette.primary.main,
          }),
        },
      ],
    },

    // Buttons scale comfortably on mobile
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 'clamp(14px, 2.5vw, 20px)',
          height: 'clamp(38px, 6.5vw, 46px)',
        },
      },
    },

    // Papers/Cards don’t leak outside on small screens
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', overflow: 'hidden' } } },
    MuiCard:  { styleOverrides: { root: { overflow: 'hidden' } } },

    // Containers: add gentle side padding on small screens
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
          [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
        }),
      },
    },

    // Grids/Stacks: ensure flex items can shrink instead of overflowing
    MuiGrid:  { styleOverrides: { root: { minWidth: 0 } } },
    MuiStack: { styleOverrides: { root: { minWidth: 0 } } },

    // Long links won’t push layout sideways
    MuiLink:  { styleOverrides: { root: { wordBreak: 'break-word' } } },
  },
});

// Smoothly scale type across breakpoints
const theme = responsiveFontSizes(base, { factor: 2.2 });

export default theme;
