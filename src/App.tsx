import { Hub } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./theme";
import { AUTH_ROUTES } from "routes/paths";

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
