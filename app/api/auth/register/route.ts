import prisma from "@/prisma/client";
import { registerSchema } from "@/shared/schemas/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedDate = registerSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email: validatedDate.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Этот email уже зарегистрирован" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(validatedDate.password, 10);

        const user = await prisma.user.create({
            data: {
                name: validatedDate.name,
                email: validatedDate.email,
                password: hashedPassword,
                emailVerified: new Date(),
                profile: {
                    create: {
                        bio: "Новый пользователь",
                        avatar: null,
                    },
                },
            },
            include: {
                profile: true,
            },
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.error("Registration error", error);
        return NextResponse.json(
            { error: "Ошибка регистрации. Попробуйте позже" },
            { status: 500 }
        );
    }
}
