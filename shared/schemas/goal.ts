import { z } from 'zod'

export const goalSchema = z.object({
	title: z
		.string()
		.min(3, 'Название должно быть не менее 3 символов')
		.max(15, 'Название должно быть не более 15 символов'),
	description: z
		.string()
		.min(10, 'Описание должно быть не менее 10 символов'),
	specific: z.string().min(5, 'Укажите конкретику цели'),
	measurable: z.string().min(3, 'Опишите, как измерить успех'),
	achievable: z.string().min(3, 'Укажите, как цель достижима'),
	relevant: z.string().min(3, 'Объясните актуальность цели'),
	timeBoundText: z
		.string()
		.min(2, 'Введите срок цели в текстовом формате')
		.max(50, 'Слишком длинное описание'),
	timeBoundDate: z
		.string()
		.nonempty('Укажите дату достижения цели')
		.refine(
			value => {
				const inputDate = new Date(value)
				const today = new Date()
				today.setHours(0, 0, 0, 0)
				return inputDate >= today
			},
			{ message: 'Дата не может быть меньше текущей' }
		),
	isPublic: z.boolean().default(true),
})
