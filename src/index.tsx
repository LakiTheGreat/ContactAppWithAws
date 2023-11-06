import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// import { Amplify } from "aws-amplify";

import App from "./App";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
// import awsmobile from "aws-exports";

// Amplify.configure(awsmobile);

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
