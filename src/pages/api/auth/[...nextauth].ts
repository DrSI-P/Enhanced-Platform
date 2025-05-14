import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a simplified version for demonstration
        // In production, you would fetch the user from your database
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // In a real implementation, you would use Prisma to fetch the user
          // const user = await prisma.user.findUnique({
          //   where: { email: credentials.email }
          // });
          
          // For demo purposes, we'll use a hardcoded user
          const user = {
            id: '1',
            name: 'Demo User',
            email: 'demo@edpsychconnect.com',
            password: '$2b$10$8r0qPVaJIIiZ7/QZm0xK2eQSVyVYjlH7pfKmVVFrjqhI2BZ1gPyTa', // hashed 'password123'
            role: 'educator'
          };

          if (!user) {
            return null;
          }

          // In production, you would use bcrypt to compare passwords
          // const isPasswordValid = await compare(credentials.password, user.password);
          
          // For demo purposes, we'll accept any password for the demo user
          const isPasswordValid = credentials.email === 'demo@edpsychconnect.com';

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-for-development',
});