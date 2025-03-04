import ProfileGoalsList from "@/features/goals/list/ProfileGoalsList";
import PageContainer from "@/shared/PageContainer";
import ProfileCard from "@/widgets/ProfileCard";

//удалять старую аватарку из supabase

export default function ProfilePage() {
    return (
        <PageContainer>
            <div className="px-52 w-full mx-auto flex justify-center items-center gap-x-10">
                <div className="h-[652px]">
                    <ProfileCard />
                </div>

                <div>
                    <ProfileGoalsList />
                </div>
            </div>
        </PageContainer>
    );
}
