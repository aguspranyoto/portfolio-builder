import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

interface Profile {
    name: string;
    job_title: string;
    job_description: string;
}

interface Images {
    background_image: string | null;
    profile_image: string | null;
}

export interface Experience {
    id: string;
    position: string;
    company: string;
    description: string;
    start_date: string;
    end_date: string;
}

interface PortfolioState {
    portfolio: {
        profile: Profile;
        images: Images;
        experiences: Experience[];
    };
}

interface PortfolioActions {
    updateProfileField: (field: keyof Profile, value: string) => void;
    updateImage: (field: keyof Images, file: string | null) => void;
    updateExperienceField: (
        id: string,
        field: keyof Experience,
        value: string
    ) => void;
    addExperience: () => void;
    deleteExperience: (id: string) => void;
}

const indexedDBStorage = {
    getItem: async (name: string) => {
        console.log(`(IndexedDB) Getting -> ${name}`);
        return await get(name);
    },
    setItem: async (name: string, value: unknown) => {
        console.log(`(IndexedDB) Setting -> ${name}`);
        await set(name, value);
    },
    removeItem: async (name: string) => {
        console.log(`(IndexedDB) Deleting -> ${name}`);
        await del(name);
    },
};

export const usePortfolioStore = create<PortfolioState & PortfolioActions>()(
    persist(
        (set) => ({
            portfolio: {
                profile: { name: "", job_title: "", job_description: "" },
                images: { background_image: null, profile_image: null },
                experiences: [],
            },

            updateProfileField: (field, value) =>
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        profile: { ...state.portfolio.profile, [field]: value },
                    },
                })),

            updateImage: (field, file) =>
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        images: { ...state.portfolio.images, [field]: file },
                    },
                })),

            updateExperienceField: (id, field, value) =>
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        experiences: state.portfolio.experiences.map((exp) =>
                            exp.id === id ? { ...exp, [field]: value } : exp
                        ),
                    },
                })),

            addExperience: () =>
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        experiences: [
                            ...state.portfolio.experiences,
                            {
                                id: `exp-${Date.now()}`,
                                position: "",
                                company: "",
                                description: "",
                                start_date: "",
                                end_date: "",
                            },
                        ],
                    },
                })),

            deleteExperience: (id) =>
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        experiences: state.portfolio.experiences.filter(
                            (exp) => exp.id !== id
                        ),
                    },
                })),
        }),
        {
            name: "portfolio-storage",
            storage: createJSONStorage(() => indexedDBStorage),
        }
    )
);
