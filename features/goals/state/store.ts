import { create } from "zustand";

export type GoalState = {
    stage: number;
    stages: string[];
    title: string;
    description: string;
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
    isPublic: boolean;
    setIsPublic: (value: boolean) => void;
    nextStep: () => void;
    prevStep: () => void;
    setField: (
        field: keyof Omit<
            GoalState,
            "state" | "stages" | "nextStep" | "prevStep" | "setField"
        >,
        value: string
    ) => void;
};

export const useGoalState = create<GoalState>((set) => ({
    stage: 0,
    stages: [
        "title",
        "description",
        "specific",
        "measurable",
        "achievable",
        "relevant",
        "timeBound",
        "preview",
    ],
    title: "",
    description: "",
    specific: "",
    measurable: "",
    achievable: "",
    relevant: "",
    timeBound: "",
    isPublic: true,
    setIsPublic: (value) => set({ isPublic: value }),
    nextStep: () =>
        set((state) => ({
            stage: Math.min(state.stage + 1, state.stages.length - 1),
        })),
    prevStep: () => set((state) => ({ stage: Math.max(state.stage - 1, 0) })),
    setField: (field, value) => set({ [field]: value } as Partial<GoalState>),
}));
