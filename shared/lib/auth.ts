import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { adapter } from "next/dist/server/web/adapter";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../schemas/auth";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(adapter),
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = await loginSchema.parseAsync(
                        credentials
                    );

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });
                    if (!user) return null;

                    const isValid = await bcrypt.compare(
                        password,
                        user.password
                    );
                    return isValid ? user : null;
                } catch {
                    return null;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            return session;
        },
    },
});
