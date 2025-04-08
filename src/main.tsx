import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";
import { RootLayout } from "./layouts";
import { DASHBOARD_ROUTES_LIST } from "./routes.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            {DASHBOARD_ROUTES_LIST.map((route) => (
              <Route key={route.path} path={route.path} element={<App />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
