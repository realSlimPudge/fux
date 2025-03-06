import ProfileGoalsList from "@/features/goals/list/ProfileGoalsList";
import ProfileCard from "@/widgets/ProfileCard";

//удалять старую аватарку из supabase

export default function ProfilePage() {
    return (
        <div className="w-[80%] mx-auto flex justify-center items-start gap-x-10 sm:flex-row flex-col">
            <div className="h-[652px] w-1/4">
                <ProfileCard />
            </div>

            <div className="w-3/4">
                <ProfileGoalsList />
            </div>
        </div>
    );
}
