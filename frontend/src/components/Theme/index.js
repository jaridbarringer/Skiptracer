import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC6567",
      light: "#367E77",
      dark: "#000000",
      contrastText: "#F2F2F2",
    },
    secondary: {
      main: "#FBC272",
      light: "#fff",
      dark: "#cccccc",
      contrastText: "#C9C9C9",
      darkWhite: "#F3F3F3",
    },
    Warning: {
      main: "#FBC272",
    },
  },
  typography: {
    body1: {
      fontFamily: "Rubik-Regular",
      fontWeight: 700,
    },
    body2: {
      fontFamily: "Rubik-Regular",
      fontWeight: 400,
    },
    body3: {
      fontFamily: "Rubik-Regular",
      fontWeight: 400,
      fontSize: "25px",
      lineHeight: "48.25px",
    },
    body4: {
      fontFamily: "Rubik-Regular",
      fontWeight: 700,
      fontSize: "25px",
      lineHeight: "30px",
    },
    h2: {
      fontFamily: "Rubik-Regular",
      fontWeight: 700,
      fontSize: "60px",
      lineHeight: "85.2px",
    },
    h3: {
      fontFamily: "Rubik-Regular",
      fontWeight: 700,
      fontSize: "45px",
      lineHeight: "54px",
    },
    h4: {
      fontFamily: "Rubik-Regular",
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "39.56px",
    },
    subtitle1: {
      fontFamily: "Rubik-Regular",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "38.6px",
    },
    subtitle2: {
      fontFamily: "Rubik-Regular",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "28.6px",
    },
  },
});

export default theme;
