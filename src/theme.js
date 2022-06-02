import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  gray:{
    800:"hsl(221, 48%, 15%)"
  },
  blue:{
    200:"rgba(0, 200, 255, 1)"
  },
  primary:{
    light:"rgba(0, 200, 255, 1)",
    base:"hsl(234, 71%, 25%)",
    dark:"hsl(234, 71%, 18%)",
  },
  overlays:{
    primary:"hsla(234, 71%, 20%,0.3)",
    gray:"hsla(0, 0%, 0%, 0.3)",
    white:"hsla(0, 0%, 100%, 0.3)"
  },
  light:{
    100: "hsl(223, 100%, 100%)",
    200: "hsl(223, 56%, 94%)"
  },
  dark:{
    100: "hsl(221, 48%, 19%)",
    200: "hsl(221, 48%, 15%)"
  },
  bgGrad: "linear-gradient(to-br, primary.base, primary.light)",
  fonts:{
    pomo:"Arial Rounded, sans-serif"
  }
}

const theme = extendTheme({ config, colors })

export default theme