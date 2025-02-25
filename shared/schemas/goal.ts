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
	timeBound: z.string().nonempty('Укажите срок достижения цели'),
})
