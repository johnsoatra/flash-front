const Env = {
  NodeEnv: process.env.NODE_ENV,
  ApiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  SiteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
} as const;

export default Env;
