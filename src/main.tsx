import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { Fragment } from "react/jsx-runtime";

createRoot(document.getElementById("root")!).render(
  <Fragment>
    <App />
    <Toaster position="top-center" richColors/>
  </Fragment>
);
