import prisma from "@/prisma/client";
import { authOptions } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
): Promise<Response> {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!id) {
        return new Response(JSON.stringify({ error: "ID не указан" }), {
            status: 400,
        });
    }

    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    if (session?.user.id !== id) {
        return new Response(JSON.stringify({ error: "ID не указан" }), {
            status: 400,
        });
    }

    const privateGoals = await prisma.goal.findMany({
        where: {
            userId: id,
            isPublic: false,
        },
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
            isPublic: false,
            _count: false,
        },
    });

    return new Response(JSON.stringify(privateGoals), { status: 200 });
}
