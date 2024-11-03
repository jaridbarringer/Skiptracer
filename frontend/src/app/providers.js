"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/components";

export default function Providers({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
