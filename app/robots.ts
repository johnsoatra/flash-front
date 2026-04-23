import { MetadataRoute } from "next";
import { isProd } from "@/utils/utils";

export default function robots(): MetadataRoute.Robots {
  if (!isProd()) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  };
}
