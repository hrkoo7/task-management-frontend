import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    taskStatus: {
      todo: 'gray.200',
      inProgress: 'blue.200',
      done: 'green.200',
      overdue: 'red.300'
    }
  },
  fonts: {
    heading: 'Inter, -apple-system, sans-serif',
    body: 'Inter, -apple-system, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.600',
          color: 'white',
          _hover: {
            bg: 'brand.700',
            transform: 'translateY(-1px)',
          },
        },
        outline: {
          borderColor: 'brand.600',
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
          }
        }
      }
    },
    Input: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px brand.500',
          }
        }
      }
    },
    FormLabel: {
      baseStyle: {
        fontWeight: '500',
        color: 'gray.700',
        mb: '1'
      }
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
        lineHeight: 'base',
      }
    }
  },
  space: {
    4.5: '1.125rem',
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'shorter',
    },
    body: {
      fontFamily: 'body',
      lineHeight: 'base',
    }
  }
});

export default theme;