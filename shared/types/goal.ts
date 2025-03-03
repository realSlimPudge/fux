type Goal = {
    id: string;
    isLiked: boolean;
    title: string;
    description: string;
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBoundText: string;
    timeBoundDate: string;
    userId: string;
    isPublic: boolean;
    user: {
        name: string;
        profile: {
            avatar: string;
        };
    };
    _count: {
        likes: number;
    };
};

export type { Goal };
