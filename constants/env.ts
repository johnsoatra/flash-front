const Env = {
  NodeEnv: process.env.NODE_ENV,
  ApiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
} as const;

export default Env;
