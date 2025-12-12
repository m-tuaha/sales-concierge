import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "GMS Sales Assistant",
  description: "Phase 1 Chatbot",
=======
  title: "Sales Assistant",
  description: "GMS Sales Concierge Phase 1",
>>>>>>> e7d22850a711c78b89e94b1e3a5b350f89f67cfd
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
