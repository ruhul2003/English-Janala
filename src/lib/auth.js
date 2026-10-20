import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || 'english-janala-secret-key-at-least-32-chars-long',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-secret',
    },
  },
});
