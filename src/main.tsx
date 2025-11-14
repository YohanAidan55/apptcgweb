import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/routes";
import { Provider } from "react-redux";
import { store } from "@/Services/store";
import CustomThemeProvider from "@/theme/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <RouterProvider router={router} />
      </CustomThemeProvider>
    </Provider>
  </StrictMode>
);
