import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../schemas/auth";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

//Конфигурация NextAuth

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
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
            const dbUser = await prisma.user.findUnique({
                where: { id: token.id as string },
            });
            const dbProfile = await prisma.profile.findUnique({
                where: { userId: token.id as string },
            });
            if (!dbUser) {
                session.user = { id: "", name: null, email: null, image: null };
            } else {
                session.user.id = dbUser.id;
                session.user.name = dbUser.name;
                session.user.image = dbProfile?.avatar;
            }
            return session;
        },
    },
};

const authHandler = NextAuth(authOptions);

export default authHandler;
export { authHandler as auth };
