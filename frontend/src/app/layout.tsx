import type { Metadata } from "next";
import { Providers } from "@/provider/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tecnologia esportiva",
  description: "Aplicação para gerenciamento de sócio-torcedores",
  icons: {
    icon: "/avatar.jpeg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}