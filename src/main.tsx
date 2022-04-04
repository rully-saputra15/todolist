import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  }
})
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
