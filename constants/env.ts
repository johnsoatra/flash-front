const Env = {
  NodeEnv: process.env.NODE_ENV ?? 'development',
  ApiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
}

export default Env;
