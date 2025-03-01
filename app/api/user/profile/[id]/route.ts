import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    context: unknown
): Promise<Response> {
    const { params } = context as { params: { id: string } };
    const { id } = params;

    const session = await getServerSession(authOptions);

    if (!id) {
        return new Response(JSON.stringify({ error: "ID не указан" }), {
            status: 400,
        });
    }

    // Если запрос к "/profile/me", подставляем ID текущего юзера
    const userId = id === "me" ? session?.user?.id ?? null : id;

    if (!userId) {
        return new Response(JSON.stringify({ error: "Не авторизован" }), {
            status: 401,
        });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            createdAt: true,
            profile: true,
            email: userId === session?.user?.id,
        },
    });

    if (!user) {
        return new Response(
            JSON.stringify({ error: "Пользователь не найден" }),
            { status: 404 }
        );
    }

    return new Response(JSON.stringify(user), { status: 200 });
}
