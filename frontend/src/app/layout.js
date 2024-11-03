import "./globals.css";
import { Navbar } from "@/components";
import Providers from "./providers";

export const metadata = {
  title: "SkipTracer",
  description: "Get Landowners Data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
