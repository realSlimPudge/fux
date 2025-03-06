import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "FUX - Smart goals",
        short_name: "FUX",
        description:
            "Создавайте SMART-цели, делитесь с другими пользователями, достигайте результата",
        start_url: "/",
        display: "standalone",
        background_color: "#f3f4f6",
        theme_color: "#000000",
    };
}
