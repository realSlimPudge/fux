'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthWidget() {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <div>Загрузка...</div>
	}

	if (session && session.user) {
		return (
			<div className='flex w-[120px] h-[40px] justify-center items-center px-4 py-3 bg-white rounded-xl'>
				<div className='w-[30px] h-[30px] overflow-hidden rounded-full bg-white flex items-center justify-center'>
					<Image
						width={30}
						height={30}
						alt='user'
						src='/user-profile.svg'
					/>
				</div>
				<div className='ml-10'>
					<span className='text-black'>{session.user.name}</span>
				</div>
			</div>
		)
	}

	return (
		<div className='flex gap-y-10'>
			<Link
				href='/register'
				className='px-4 py-3 bg-white border-1 border-red-500 text-black rounded-xl'
			>
				Регистрация
			</Link>

			<Link
				href='/login'
				className='px-4 py-3  border-1 border-gray-300 rounded-xl'
			>
				вход
			</Link>
		</div>
	)
}
