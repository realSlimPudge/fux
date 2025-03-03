import prisma from "@/prisma/client";
import { authOptions } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//Добавить в модель дату создание

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 5;
    const skip = (page - 1) * perPage;

    const [goals, total] = await Promise.all([
        prisma.goal.findMany({
            where: { isPublic: true },
            skip,
            take: perPage,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                description: true,
                specific: true,
                measurable: true,
                achievable: true,
                relevant: true,
                timeBoundText: true,
                timeBoundDate: true,
                userId: true,
                isPublic: true,
                user: {
                    select: {
                        name: true,
                        profile: {
                            select: {
                                avatar: true,
                            },
                        },
                    },
                },
                _count: {
                    select: { likes: true },
                },
                likes: userId
                    ? {
                          where: { userId },
                          select: { id: true },
                      }
                    : false,
            },
        }),
        prisma.goal.count({
            where: { isPublic: true },
        }),
    ]);

    const goalsWithLikeStatus = goals.map((goal) => ({
        ...goal,
        isLiked: goal.likes?.length > 0,
    }));

    return NextResponse.json({
        goals: goalsWithLikeStatus,
        total,
        page,
        perPage,
    });
}
