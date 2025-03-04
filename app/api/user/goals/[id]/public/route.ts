import prisma from "@/prisma/client";

export async function GET(req: Request, context: unknown): Promise<Response> {
    const { params } = context as { params: { id: string } };
    const { id } = params;
    // const session = await getServerSession(authOptions);
    // const userId = session?.user?.id;

    if (!id) {
        return new Response(JSON.stringify({ error: "ID не указан" }), {
            status: 400,
        });
    }

    const publicGoals = await prisma.goal.findMany({
        where: {
            userId: id,
            isPublic: true,
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
            isPublic: true,
            _count: {
                select: { likes: true },
            },
        },
    });

    return new Response(JSON.stringify(publicGoals), { status: 200 });
}
