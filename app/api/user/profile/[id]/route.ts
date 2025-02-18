import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    const { id } = params;

    if (!id) {
        return new Response(JSON.stringify({ error: "ID не указан" }), {
            status: 400,
        });
    }

    // Если запрос к "/profile/me", подставляем ID текущего юзера
    const userId = id === "me" ? session?.user?.id : id;

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
