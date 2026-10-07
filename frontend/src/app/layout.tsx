import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "IoT Lighting Research",
  description: "Исследование интеллектуального управления освещением",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header><nav>
          <Link className="brand" href="/">IoT Lighting Research</Link>
          <Link href="/measurements">Измерения</Link>
          <Link href="/measurements/new">Добавить</Link>
          <a href="http://localhost:8000/docs" target="_blank">Swagger API</a>
        </nav></header>
        <main>{children}</main>
      </body>
    </html>
  );
}
