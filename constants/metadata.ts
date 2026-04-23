import type { Metadata } from "next";
import Env from "./env";
import { isProd } from "@/utils/utils";

const MetaData: Metadata = {
  metadataBase: new URL(Env.SiteUrl),
  title: "Flash",
  description: "Flash is a web app that allows users to purchase top-up cards at a discounted price as part of a promotional rollout.",
  keywords: [
    "top-up",
    "discount card",
    "mobile recharge",
    "Flash app",
    "Smart top up",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  robots: isProd() ? {
    index: true,
    follow: true,
  } : {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
  authors: [
    {
      name: "Flash",
      url: "https://flash.soatra.com",
    },
  ],
  creator: "Soatra",
  publisher: "Soatra",
  applicationName: "Flash",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flash",
    description: "Flash is a web app that allows users to purchase top-up cards at a discounted price.",
    url: "/",
    siteName: "Flash",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash",
    description: "Flash is a web app that allows users to purchase top-up cards at a discounted price.",
    images: ["/twitter-image.jpg"],
  },
};

export default MetaData;
