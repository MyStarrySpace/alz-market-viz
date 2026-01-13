import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Untangling Alzheimer's",
  description:
    'The science, the system, and the search for a cure. An interactive exploration of Alzheimer\'s research barriers, competing theories, and emerging treatments.',
  keywords: [
    'Alzheimer\'s disease',
    'dementia research',
    'clinical trials',
    'drug development',
    'amyloid hypothesis',
    'tau protein',
    'neurodegeneration',
    'visualization',
  ],
  authors: [{ name: 'GoInvo Healthcare Design Studio' }],
  openGraph: {
    title: "Untangling Alzheimer's",
    description:
      'The science, the system, and the search for a cure. Exploring barriers, theories, and breakthroughs in Alzheimer\'s research.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
