import "./globals.css";
import { Poppins, Nunito_Sans, Noto_Sans_Khmer } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import { Label } from "@/constants";
import { ErrorResponse, Lang } from "@/types";
import { MainContextProvider } from "@/context/mainContext";
import MetaData from "@/constants/metadata";
import Api from "@/constants/api";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Container from "@/components/Container";
import ErrorLogger from "@/components/ErrorLogger";
import { GetConfigResponse } from "@/dto/getConfig";
import request, { errorJson } from "@/utils/request";
import { validateLang } from "@/utils/cookie/lang";
import tryCatch from "@/utils/tryCatch";
import { isKhmer } from "@/utils/utils";

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
const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kh",
  display: "swap",
});

export const metadata = MetaData;

async function getLangServer() {
  const lang = (await cookies()).get(Label.Lang)?.value;
  return lang ? validateLang(lang) : 'kh';
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const errors: ErrorResponse[] = [];
  let config = await tryCatch<GetConfigResponse, undefined>(() =>
    request(Api.GetConfig),
    async (error: any) => {
      const _error = await errorJson(error, Api.GetConfig);
      errors.push(_error);
    }
  );
  let lang = await tryCatch<Lang>(() =>
    getLangServer(),
    async () => {
      errors.push({
        statusCode: 500,
        message: 'Error get lang',
        url: '',
      });
      return 'kh';
    }
  );

  return (
    <html
      lang={lang}
      className={`${poppins.variable} ${nunito.variable} ${notoSansKhmer.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${isKhmer(lang) ? 'font-noto-sans-kh' : 'font-poppins'}`}>
        <MainContextProvider
          lang={lang}
          config={config}>
          <Container>
            <Header />
            <div className="w-full max-w-253 flex-1 self-center flex flex-col items-start justify-start px-4">
              {children}
            </div>
            <Footer />
          </Container>
          <ErrorLogger errors={errors} />
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-noto-sans-kh',
            }}
          />
        </MainContextProvider>
      </body>
    </html>
  );
}
