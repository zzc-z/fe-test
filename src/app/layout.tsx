import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel App",
  description: "Panel application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full flex flex-col">{children}</body>
    </html>
  );
}
