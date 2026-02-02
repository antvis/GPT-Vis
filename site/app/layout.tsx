import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPT-Vis - AI-Native Visualization for the LLM Era",
  description: "Framework-agnostic visualization library designed for AI-powered applications. 20+ chart types with natural syntax that LLMs can generate effortlessly.",
  keywords: ["GPT-Vis", "AI visualization", "LLM", "charts", "data visualization", "AI-native"],
  authors: [{ name: "AntV Team" }],
  openGraph: {
    title: "GPT-Vis - AI-Native Visualization for the LLM Era",
    description: "Framework-agnostic visualization library designed for AI-powered applications.",
    url: "https://gpt-vis.antv.vision",
    siteName: "GPT-Vis",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPT-Vis - AI-Native Visualization for the LLM Era",
    description: "Framework-agnostic visualization library designed for AI-powered applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
