'use client'
import GoalCard from '@/entities/goal/GoalCard'
import GoalCardSkeleton from '@/shared/skeletons/GoalCardSkeleton'
import { Goal } from '@/shared/types/goal'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProfileGoalsList() {
	const { id } = useParams()
	const { data, isLoading } = useSWR(
		`/api/user/goals/${id}/public`,
		fetcher,
		{
			refreshInterval: 5000,
		}
	)
	return (
		<ul className='space-y-10 w-full'>
			{isLoading
				? Array(5)
						.fill(0)
						.map((_, i) => <GoalCardSkeleton key={i} />)
				: data?.map((goal: Goal) => (
						<GoalCard key={goal.id} goal={goal} />
				  ))}
		</ul>
	)
}
