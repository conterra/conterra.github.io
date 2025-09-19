import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        primaryBlue: '#005587',
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
        highlight: '#ffd700'
    },
})

export default theme