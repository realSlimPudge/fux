'use client'

import { Goal } from '@/shared/types/goal'
import { Button } from '@mui/material'
import { startTransition, useOptimistic, useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { useSession } from 'next-auth/react'

type LikeInterface = {
	goal: Goal
}

export default function LikeButton({ goal }: LikeInterface) {
	const { status } = useSession()

	const [isLiked, setIsLiked] = useState<boolean>(goal.isLiked)
	console.log(isLiked)
	const [likeCount, setLikeCount] = useState<number>(goal._count.likes)

	const [optimisticLikes, addOptimisticLikes] = useOptimistic(
		(likeCount, isLiked),
		(state, ss, delta: number) => state + delta
	)

	const toggleLike = async () => {
		// const delta = isLiked ? -1 : 1
		console.log('before', isLiked)
		setIsLiked(prev => !prev)
		console.log('after', isLiked)
		// addOptimisticLikes(delta)

		const res = await fetch('api/goals/like', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ goalId: goal.id }),
		})
		if (res.ok) {
			setLikeCount(prev => prev + 1)
		}
	}

	return (
		<form action={toggleLike}>
			<Button
				type='submit'
				sx={{
					padding: '0.25rem 1.75rem',
					borderRadius: '0.75rem',
					border: '1px #030712 solid',
					color: 'black',
					display: 'flex',
					alignItems: 'center',
					transition: '300ms ease all',
				}}
				startIcon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
				variant='outlined'
				disabled={status === 'unauthenticated'}
				className={`${isLiked && ' bg-gray-950 text-white'}`}
			>
				<span className='mt-1'>{optimisticLikes} Лайк</span>
			</Button>
		</form>
	)
}
