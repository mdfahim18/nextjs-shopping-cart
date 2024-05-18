import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './LayoutContainer';
import Sidebar from '@/components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Shopping.com',
  description: 'Best online shop in the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Providers>
        <body className='bg-slate-500 relative'>
          <Navbar />
          {children}
          <Footer />
          <Sidebar />
          <ToastContainer />
        </body>
      </Providers>
    </html>
  );
}
