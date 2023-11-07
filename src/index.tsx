import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "store";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HelmetProvider>
    <CollapseDrawerProvider>
      <Provider store={store}>
        <Authenticator.Provider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Authenticator.Provider>
      </Provider>
    </CollapseDrawerProvider>
  </HelmetProvider>
);
