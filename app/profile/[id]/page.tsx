import PageContainer from "@/shared/PageContainer";
import ProfileCard from "@/widgets/ProfileCard";

//вынести карточку профиля в отдельный компонент
//удалять старую аватарку из supabase

export default function ProfilePage() {
    return (
        <PageContainer>
            <div className="px-52 w-full mx-auto flex justify-center items-center gap-x-10">
                <div className="h-[652px]">
                    <ProfileCard />
                </div>

                <div className="bg-gray-950 w-full">asdf</div>
            </div>
        </PageContainer>
    );
}
