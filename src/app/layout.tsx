import type { Metadata } from 'next';
import './globals.css';
import CosmosNav from '@/components/CosmosNav';
import StarfieldCanvas from '@/components/StarfieldCanvas';

export const metadata: Metadata = {
  title: 'COSMOS — The universe, twelve objects at a time.',
  description: 'An explorer for the most remarkable objects in the cosmos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#03030a] text-[#f0f0ff] min-h-screen overflow-x-hidden">
        <StarfieldCanvas />
        <CosmosNav />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
