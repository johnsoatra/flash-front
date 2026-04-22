import "./globals.css";
import { Poppins, Nunito_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { MainContextProvider } from "@/context/mainContext";
import MetaData from "@/constants/metadata";
import Api from "@/constants/api";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Container from "@/components/Container";
import PopupProcessing from "@/components/Popups/PopupProcessing";
import ErrorLogger from "@/components/ErrorLogger";
import { GetConfigResponse } from "@/dto/getConfig";
import { ErrorResponse } from "@/types";
import request, { errorJson } from "@/utils/request";

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

export const metadata = MetaData;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const errors: ErrorResponse[] = [];
  let config: GetConfigResponse | undefined;

  try {
    config = await request(Api.GetConfig, {
      cache: 'no-store',
    });
  } catch (error: any) {
    const _error = await errorJson(error, Api.GetConfig);
    errors.push(_error);
  }

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-poppins">
        <MainContextProvider config={config}>
          <Container>
            <Header />
            <div className="w-full max-w-253 flex-1 self-center px-4">
              {children}
            </div>
            <Footer />
            <PopupProcessing />
          </Container>
          <ErrorLogger errors={errors} />
          <Toaster position="top-right" />
        </MainContextProvider>
      </body>
    </html>
  );
}
