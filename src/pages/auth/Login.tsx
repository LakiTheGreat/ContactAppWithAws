import {
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Logo from "components/Logo";

export default function Login() {
  const { tokens } = useTheme();
  const theme: Theme = {
    name: "Auth Example Theme",
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.white.value,
          },
          secondary: {
            value: tokens.colors.blue["10"].value,
          },
        },
        font: {
          interactive: {
            value: tokens.colors.blue["60"].value,
          },
        },
        brand: {
          primary: {
            "10": tokens.colors.blue["100"],
            "80": tokens.colors.blue["60"],
            "90": tokens.colors.blue["40"],
            "100": tokens.colors.blue["20"],
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.blue["100"].value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.blue["80"].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.blue["100"].value,
              },
            },
          },
        },
      },
    },
  };

  return (
    <Stack
      sx={{ height: "100%" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Stack alignItems="center">
        <Logo sx={{ width: 100, height: 100 }} />
        <Typography variant="h1">Contacts App</Typography>
      </Stack>
      <ThemeProvider theme={theme}>
        <Authenticator></Authenticator>
      </ThemeProvider>
    </Stack>
  );
}
