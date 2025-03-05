export default function GoalLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section className='bg-gray-100 text-white w-screen min-h-screen py-32'>
			{children}
		</section>
	)
}
