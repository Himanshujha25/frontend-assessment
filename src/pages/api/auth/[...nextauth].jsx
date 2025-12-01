import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          console.log("DummyJSON Response:", data);

          // DummyJSON v2 check: token OR accessToken
          if (!res.ok || (!data.token && !data.accessToken)) {
            console.log("Login failed", data);
            return null;
          }

          // Normalize so NextAuth callbacks always use "token"
          return {
            ...data,
            token: data.token || data.accessToken,
          };

        } catch (error) {
          console.log("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
