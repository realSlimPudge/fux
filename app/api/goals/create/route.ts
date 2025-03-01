import prisma from "@/prisma/client";
import { authOptions } from "@/shared/lib/auth";
import { goalSchema } from "@/shared/schemas/goal";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }
    const userId = session.user.id;
    try {
        const body = await req.json();
        const validatedData = goalSchema.parse(body);

        console.log("📩 Входящие данные:", validatedData);

        const newGoal = await prisma.goal.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                specific: validatedData.specific,
                measurable: validatedData.measurable,
                achievable: validatedData.achievable,
                relevant: validatedData.relevant,
                timeBoundText: validatedData.timeBoundText,
                timeBoundDate: validatedData.timeBoundDate,
                userId: userId,
                isPublic: validatedData.isPublic,
            },
        });
        return NextResponse.json({ goal: newGoal }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
