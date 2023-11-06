import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HelmetProvider>
    <CollapseDrawerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CollapseDrawerProvider>
  </HelmetProvider>
);
