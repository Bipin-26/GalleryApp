import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { GalleryProvider } from "./contexts/gallery.context";
import AuthProvider from "./contexts/auth.context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
      <AuthProvider>
        <GalleryProvider>
          <App />
        </GalleryProvider>
      </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

