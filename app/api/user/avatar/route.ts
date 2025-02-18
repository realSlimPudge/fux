import prisma from "@/prisma/client";
import { authOptions } from "@/shared/lib/auth";
import { supabase } from "@/shared/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("avatar") as Blob | null;

    if (!file)
        return NextResponse.json({ error: "Файл не передан" }, { status: 400 });

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
