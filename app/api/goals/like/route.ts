//сделать логику при нажатии на лайк отправляется запрос, при
//при загрузке запросы не отравляются, но лайки отображаются

import prisma from '@/prisma/client'
import { authOptions } from '@/shared/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { goalId } = await req.json()
	const userId = session.user.id

	if (!goalId) {
		return NextResponse.json(
			{ error: 'goalId is required' },
			{ status: 400 }
		)
	}

	try {
		const existingLike = await prisma.like.findUnique({
			where: { userId_goalId: { userId, goalId } },
		})

		if (existingLike) {
			await prisma.like.delete({
				where: { id: existingLike.id },
			})
			return NextResponse.json({ message: 'Like removed' })
		}

		await prisma.like.create({
			data: { userId, goalId },
		})

		return NextResponse.json({ message: 'Like added' })
	} catch (error) {
		console.error('Error in like API:', error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
