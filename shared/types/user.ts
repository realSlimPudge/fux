type UserProfile = {
    avatar: string;
    bio: string;
    userId: string;
};

type User = {
    id: string;
    name: string;
    createdAt: string;
    email: string;
    profile: UserProfile;
};

export type { User };
