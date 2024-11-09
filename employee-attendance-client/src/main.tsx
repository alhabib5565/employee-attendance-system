import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "sonner";
import { router } from "./routes/routes.tsx";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors position="bottom-right" />
    </Provider>
  </React.StrictMode>
);
