import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Profile {
    name: string;
    job_title: string;
    job_description: string;
}

interface Images {
    background_image: string;
    profile_image: string;
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
    updateImage: (field: keyof Images, url: string) => void;
    updateExperienceField: (
        id: string,
        field: keyof Experience,
        value: string
    ) => void;
    addExperience: () => void;
    deleteExperience: (id: string) => void;
}

// Create the store
export const usePortfolioStore = create<PortfolioState & PortfolioActions>()(
    persist(
        (set) => ({
            // INITIAL STATE
            portfolio: {
                profile: { name: "", job_title: "", job_description: "" },
                images: { background_image: "", profile_image: "" },
                experiences: [],
            },

            // ACTIONS
            updateProfileField: (field, value) =>
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        profile: { ...state.portfolio.profile, [field]: value },
                    },
                })),

            updateImage: (field, url) =>
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        images: { ...state.portfolio.images, [field]: url },
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
                                // Add a new blank experience
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
            storage: createJSONStorage(() => localStorage),
        }
    )
);
