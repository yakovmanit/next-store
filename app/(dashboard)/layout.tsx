import "../globals.css";
import {Header} from "@/shared/components/shared";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      dashboard
      <Header />
      {children}
    </main>
  );
}
