import prisma from "@/prisma/client";
import { authOptions } from "@/shared/lib/auth";
import { validateContent } from "@/shared/lib/validateContent";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    const checkId = id === session?.user?.id;

    try {
        const body = await req.json();
        const bioCheck = validateContent(body.bio);

        if (!bioCheck.valid) {
            return NextResponse.json(
                { error: bioCheck.error },
                { status: 400 }
            );
        }

        if (!checkId) {
            return new Response(
                JSON.stringify({
                    error: "You are not authorized to edit this profile",
                }),
                {
                    status: 403,
                }
            );
        }

        const checkLength = body.bio.length <= 100;

        if (!checkLength) {
            return new Response(
                JSON.stringify({
                    error: "О себе должно содержать не более 100 символов",
                }),
                {
                    status: 400,
                }
            );
        }

        await prisma.profile.update({
            where: { userId: id },
            data: {
                bio: body.bio,
            },
        });
    } catch (error) {
        console.error("error", error);
    }
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
    });
}
