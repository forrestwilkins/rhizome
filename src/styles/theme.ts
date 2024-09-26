import { createTheme } from '@mui/material/styles';

const initialTheme = createTheme({
  typography: {
    fontFamily: 'system-ui',
  },
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: 'rgba(10, 10, 10)',
        },
      },
    },
    light: true,
  },
});

const theme = createTheme(initialTheme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '70px',

          [initialTheme.breakpoints.up('md')]: {
            paddingTop: '100px',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;