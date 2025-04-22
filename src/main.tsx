import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css' //
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        height: "100%",
        margin: 0,
        padding: 0,
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
