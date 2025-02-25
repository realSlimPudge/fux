'use client'

import FormAnimation from '@/shared/formAnimation/FormAnimation'
import { useGoalState } from '../../state/store'
import { useFormContext } from 'react-hook-form'
export default function TitleStep() {
	const title = useGoalState(state => state.title)
	const setField = useGoalState(state => state.setField)
	const {
		register,
		formState: { errors },
	} = useFormContext()
	const { onChange: rhfOnChange, ...inputProps } = register('title')
	return (
		<FormAnimation>
			<h2 className='text-3xl mb-3 text-center font-light '>
				Введите название{' '}
				<span className='text-gray-50 rounded-xl font-bold bg-gray-950 px-4 py-2 text-3xl pt-1'>
					цели
				</span>
			</h2>
			<input
				type='text'
				value={title}
				onChange={e => {
					setField('title', e.target.value)
					rhfOnChange(e)
				}}
				placeholder='Название цели'
				className='w-2/3  bg-gray-100 outline-none text-2xl bg-transparent border-[1px] border-gray-300 rounded-2xl px-3 py-4
                placeholder:font-light focus:border-gray-400 my-9 mt-8 mx-auto text-center items-center justify-center flex
                '
				{...inputProps}
			/>
			<p className='mb-2 text-center w-6/6 mx-auto font-medium text-base text-gray-600'>
				<span className='font-bold'>Будьте конкретны:</span> Введите
				краткое и конкретное название, отражающее суть цели. Например:
				Увеличить силовые показатели, Сбросить 5 кг.
			</p>

			<p className='mb-2 text-center w-6/6 mx-auto font-medium text-base text-gray-600'>
				<span className='font-bold'>Лаконичность:</span> Название должно
				быть коротким, но при этом содержать основную идею цели.
			</p>
			<p className='mb-7 text-center w-6/6 mx-auto font-medium text-base text-gray-600'>
				<span className='font-bold'>Отразите результат:</span>{' '}
				Подумайте, какой итог вы хотите получить. Название должно
				намекать на конечный результат.
			</p>
			{errors.title && (
				<p className='text-red-500 text-center'>
					{errors.title.message as string}
				</p>
			)}
		</FormAnimation>
	)
}
