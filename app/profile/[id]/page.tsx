import ProfileGoalsList from "@/features/goals/list/ProfileGoalsList";
import ProfileCard from "@/widgets/ProfileCard";

//удалять старую аватарку из supabase

export default function ProfilePage() {
    return (
        <div className="sm:w-[80%] w-11/12 mx-auto flex justify-center items-start gap-x-10 sm:gap-y-0 gap-y-10 sm:flex-row flex-col">
            <div className="h-fit sm:w-1/4 w-full">
                <ProfileCard />
            </div>

            <div className="sm:w-3/4 w-full">
                <ProfileGoalsList />
            </div>
        </div>
    );
}
