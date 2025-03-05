import prisma from '@/prisma/client'

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params

	if (!id) {
		return new Response(JSON.stringify({ error: 'ID не указан' }), {
			status: 400,
		})
	}

	const publicGoals = await prisma.goal.findMany({
		where: {
			userId: id,
			isPublic: true,
		},
		orderBy: { createdAt: 'desc' },
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
	})

	return new Response(JSON.stringify(publicGoals), { status: 200 })
}
