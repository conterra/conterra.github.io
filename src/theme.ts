import { extendTheme } from '@chakra-ui/react'

// Custom colors
export const colors = {
    primary: "#005587"
}

// Create custom color scheme for Chakra UI
const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f2ff',
      100: '#b3daff',
      200: '#80c2ff',
      300: '#4daaff',
      400: '#1a91ff',
      500: '#005587', // Your main color
      600: '#004570',
      700: '#003459',
      800: '#002342',
      900: '#00122b',
    },
  },
})

export default theme