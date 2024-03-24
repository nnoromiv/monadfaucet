import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const prompt = Prompt({subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})

export const metadata: Metadata = {
  title: "Monad Labs | Testnet Faucet",
  description: "Premier Blockchain technology",
  authors: [{name: 'Verdansk', url:'https://github.com/nnoromiv'}],
  keywords: ['monad', 'testnet', 'faucet', 'crypto', 'blockchain', 'ethereum'],
  publisher: 'Verdansk'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={prompt.className}>
        <Provider>
          {
            children
          }
        </Provider>
      </body>
    </html>
  );
}
