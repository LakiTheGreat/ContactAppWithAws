import { MotionLazyContainer } from "components/animate";
import Router from "./routes";
import ThemeProvider from "./theme";

export default function App() {
  return (
    <ThemeProvider>
      <MotionLazyContainer>
        <Router />
      </MotionLazyContainer>
    </ThemeProvider>
  );
}
