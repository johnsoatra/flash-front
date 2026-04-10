import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import { MainContextProvider } from "@/context/mainContext";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Container from "@/components/Container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flash",
  description: "Selling software products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-poppins">
        <MainContextProvider>
          <Container>
            <Header />
            <div className="w-full max-w-253 flex-1 self-center px-4">
              {children}
            </div>
            <Footer />
          </Container>
        </MainContextProvider>
      </body>
    </html>
  );
}
