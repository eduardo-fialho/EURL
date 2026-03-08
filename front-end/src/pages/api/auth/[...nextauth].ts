import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Spring Backend",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials : any) {
                
                const res = await fetch("http://localhost:8080/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const user = await res.json();
                if(res.ok && user) return user;
                return null;
            }
        },
    )
    ],

    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                const accessToken = (user as any).token;
                token.accessToken = accessToken;
                const decoded = jwtDecode(accessToken);
                token.userId = (decoded as any).userId;
            } 
            return token;
        },

        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            (session as any).user.id = token.userId;
            return session;
        },
    },
    
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
});