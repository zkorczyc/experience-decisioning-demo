import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Decisioning Demo",
  description: "See how Adobe Journey Optimizer decisioning picks the right offer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <footer
          style={{
            textAlign: "center",
            padding: "16px 0",
            fontSize: 12,
            color: "var(--spectrum-global-color-gray-600, #6e6e6e)",
          }}
        >
          Created by zkorczyc@adobe.com · Adobe 2026
        </footer>
      </body>
    </html>
  );
}
