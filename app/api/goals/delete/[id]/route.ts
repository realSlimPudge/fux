import prisma from "@/prisma/client";
import { authOptions } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id: goalId } = await params;

    if (!session) {
        return NextResponse.json(
            { error: "Неавторизованный пользователь" },
            { status: 401 }
        );
    }

    const userId = session.user.id;

    const goal = await prisma.goal.findUnique({
        where: { id: goalId },
    });

    if (!goal) {
        return NextResponse.json({ error: "Цель не найдена" }, { status: 404 });
    }

    if (goal.userId !== userId) {
        return NextResponse.json(
            { error: "Нет доступа для удаления чужой цели" },
            { status: 403 }
        );
    }

    try {
        await prisma.goal.delete({
            where: { id: goalId },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Ошибка при удалении цели, попробуйте позже",
                error: error,
            },
            { status: 500 }
        );
    }
}
