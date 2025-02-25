'use client'

import FormAnimation from '@/shared/formAnimation/FormAnimation'
import { useGoalState } from '../../state/store'
import { useFormContext } from 'react-hook-form'

export default function DescriptionStep() {
	const description = useGoalState(state => state.description)
	const setField = useGoalState(state => state.setField)
	const {
		register,
		formState: { errors },
	} = useFormContext()
	const { onChange: rhfOnChange, ...inputProps } = register('description')
	return (
		<FormAnimation>
			<h2 className='text-xl mb-3  text-center font-medium '>
				Введите описание{' '}
				<span className='text-gray-50 rounded-xl font-bold bg-gray-950 px-3 py-2 pt-1 '>
					цели
				</span>
			</h2>

			<textarea
				value={description}
				onChange={e => {
					setField('description', e.target.value)
					rhfOnChange(e)
				}}
				placeholder='Описание цели'
				className='w-full bg-gray-100 h-56 outline-none text-2xl bg-transparent border-[1px] border-gray-300 rounded-2xl px-3 py-4
                placeholder:font-light focus:border-gray-400 max-h-[320px] min-h-[240px] mb-4 mt-2
                '
				{...inputProps}
			/>
			<p className='mb-2 text-center w-6/6 mx-auto font-medium text-base text-gray-600'>
				<span className='font-bold'>Детализация:</span> Опишите цель
				подробно, укажите, что именно вы планируете сделать для её
				достижения.
			</p>

			<p className='mb-2 text-center w-6/6 mx-auto font-medium text-base text-gray-600'>
				<span className='font-bold'>Мотивация:</span> Укажите, почему
				эта цель важна для вас. Что вы получите, достигнув её?
			</p>
			<p className='mb-2 text-center w-6/6 mx-auto font-medium text-base text-gray-600'>
				<span className='font-bold'>Пошаговый план:</span> Опишите
				основные шаги или методы, которые помогут вам достичь цели. Это
				может быть расписание тренировок, диета или план обучения.
			</p>
			{errors.description && (
				<p className='text-red-500 text-center'>
					{errors.description.message as string}
				</p>
			)}
		</FormAnimation>
	)
}
