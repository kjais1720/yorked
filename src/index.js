import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import App from "App";
import { makeServer } from "server";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "theme";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
