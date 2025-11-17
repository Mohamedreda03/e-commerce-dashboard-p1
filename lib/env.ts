const env = {
  database: {
    DATABASE_URL: String(process.env.DATABASE_URL),
  },
  auth: {
    BETTER_AUTH_SECRET: String(process.env.BETTER_AUTH_SECRET),
    BETTER_AUTH_URL: String(process.env.BETTER_AUTH_URL),
    GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: String(process.env.GOOGLE_CLIENT_SECRET),
  },
  resend: {
    RESEND_API_KEY: String(process.env.RESEND_API_KEY),
  },
};

export default env;
