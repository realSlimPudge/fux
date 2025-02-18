import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "hxzkqgavbrtogxepczvt.supabase.co",
                pathname: "/storage/v1/object/public/avatars/**",
            },
        ],
    },
};

export default nextConfig;
