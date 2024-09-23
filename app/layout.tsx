import './globals.css'; // Jika ada style global
import { Providers } from './providers'; // Import Providers

export const metadata = {
  title: 'Todo App',
  description: 'Todo App using Next.js and RTK Query',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
