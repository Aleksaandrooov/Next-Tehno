import { Footer } from '@/components/shared/Footer/footer';
import { FooterMobile } from '@/components/shared/Footer/footer-mobile';
import { Header } from '@/components/shared/Header/header';
import { HeaderCategories } from '@/components/shared/Header/header-categories';
import { HeaderInfo } from '@/components/shared/Header/header-info';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col relative min-h-svh">
      <HeaderInfo />
      <Header />
      <HeaderCategories className="shadow-lg py-1 z-10 sticky top-14 bg-white max-lg:hidden" />
      <div className="flex-1 mb-10 flex">{children}</div>
      <Footer />
      <FooterMobile />
    </main>
  );
}
