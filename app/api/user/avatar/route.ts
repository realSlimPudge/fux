import prisma from "@/prisma/client";
import { authOptions } from "@/shared/lib/auth";
import { supabase } from "@/shared/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//добавить проверку веса изображения

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("avatar") as Blob | null;

    if (!file)
        return NextResponse.json({ error: "Файл не передан" }, { status: 400 });

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
        return NextResponse.json(
            { error: "Размер файла превышает допустимый предел" },
            { status: 400 }
        );
    }

    const currentProfile = await prisma.profile.findUnique({
        where: { userId: session.user.id },
        select: { avatar: true },
    });

    if (currentProfile?.avatar) {
        try {
            const avatarUrl = currentProfile.avatar;
            // Извлекаем имя файла из URL
            const url = new URL(avatarUrl);
            const segments = url.pathname.split("/");
            const oldFileName = segments[segments.length - 1];

            const { error: removeError } = await supabase.storage
                .from("avatars")
                .remove([oldFileName]);

            if (removeError) {
                console.error(
                    "Ошибка удаления старой аватарки",
                    removeError.message
                );
            }
        } catch (err) {
            console.error("Ошибка при попытке удалить старую аватарку", err);
        }
    }

    const mimeType = file.type;
    const extension = mimeType.split("/")[1] || "jpg";
    const filename = `${session.user.id}-${Date.now()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
        .from("avatars")
        .upload(filename, buffer, { contentType: "image/jpeg" });

    if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });

    const avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filename}`;

    await prisma.profile.update({
        where: { userId: session.user.id },
        data: {
            avatar: avatarUrl,
        },
    });

    return NextResponse.json({ avatarUrl });
}
