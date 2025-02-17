'use client';
import { signIn } from "@/shared/lib/auth"

export function LoginForm() {
    const handleSubmit = async () => {
        await signIn('credentials', { ... });
    }
}