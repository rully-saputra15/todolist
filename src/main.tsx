import React from 'react'
import { createRoot } from 'react-dom/client';
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
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
