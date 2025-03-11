import { z } from "zod";

export const goalSchema = z.object({
    title: z
        .string()
        .min(3, "Название должно быть не менее 3 символов")
        .max(25, "Название должно быть не более 15 символов"),
    description: z
        .string()
        .min(10, "Описание должно быть не менее 10 символов")
        .max(50, "Слишком длинное описание"),
    specific: z
        .string()
        .min(5, "Укажите конкретику цели")
        .max(50, "Слишком длинное описание"),
    measurable: z
        .string()
        .min(5, "Опишите, как измерить успех")
        .max(50, "Слишком длинное описание"),
    achievable: z
        .string()
        .min(5, "Укажите, как цель достижима")
        .max(50, "Слишком длинное описание"),
    relevant: z
        .string()
        .min(5, "Объясните актуальность цели")
        .max(50, "Слишком длинное описание"),
    timeBoundText: z
        .string()
        .min(5, "Введите срок цели в текстовом формате")
        .max(50, "Слишком длинное описание"),
    timeBoundDate: z
        .string()
        .nonempty("Укажите дату достижения цели")
        .refine(
            (value) => {
                const inputDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return inputDate >= today;
            },
            { message: "Дата не может быть меньше текущей" }
        ),
    isPublic: z.boolean().default(true),
});
