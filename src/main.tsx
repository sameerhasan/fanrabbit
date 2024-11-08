import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";

import { queryClient } from "./services/query-client.tsx";

import { AuthProvider } from "./context/Auth.tsx";
import PageContextContextProvider from "./context/PageContext.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PageContextContextProvider>
          <App />
        </PageContextContextProvider>
      </AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeButton={false}
      />
    </QueryClientProvider>
  </StrictMode>
);
