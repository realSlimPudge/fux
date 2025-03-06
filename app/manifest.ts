import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "FUX - Smart goals",
        short_name: "FUX",
        description:
            "Создавайте SMART-цели, делитесь с другими пользователями, достигайте результата",
        start_url: "/",
        display: "standalone",
        icons: [
            {
                src: "/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
        background_color: "#f3f4f6",
        theme_color: "#f3f4f6",
    };
}
