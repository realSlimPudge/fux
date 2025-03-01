type Goal = {
    id: string;
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
};

export type { Goal };
