import theme from "../../components/Theme";

export const styles = {
  mainBox: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "20px",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "32px",
    borderRadius: "8px",
  },
};
