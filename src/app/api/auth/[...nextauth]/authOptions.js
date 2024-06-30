import prisma from "@/DB/db.config";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials === null) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        if (user) {
          return { ...user, id: user.id.toString() };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;
      // session.jwt = token.jti;
      return session;
    },
  },
});
