import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        primaryBlue: 'rgba(0, 85, 135, 1)',
        spinnerGrey: 'rgba(145, 152, 163, 1)',
        modalOverlay: 'rgba(255, 255, 255, 0.7)',
        cardBackground: 'rgba(8, 8, 8, 1)',
        primary: {
            50: 'rgba(230, 242, 255, 1)',
            100: 'rgba(179, 218, 255, 1)',
            200: 'rgba(128, 194, 255, 1)',
            300: 'rgba(77, 170, 255, 1)',
            400: 'rgba(26, 145, 255, 1)',
            500: 'rgba(0, 85, 135, 1)', // Your main color
            600: 'rgba(0, 69, 112, 1)',
            700: 'rgba(0, 52, 89, 1)',
            800: 'rgba(0, 35, 66, 1)',
            900: 'rgba(0, 18, 43, 1)',
        },
        highlight: 'rgba(255, 215, 0, 1)'
    },
})

export default theme