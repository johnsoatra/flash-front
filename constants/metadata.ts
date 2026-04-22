import type { Metadata } from "next";
import Env from "./env";

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
  robots: {
    index: true,
    follow: true,
  },
  authors: [
    {
      name: "John Soatra",
      url: "https://www.soatra.com",
    },
  ],
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
    description: "Flash discounted top-up platform",
    images: ["/twitter-image.jpg"],
  },
};

export default MetaData;
