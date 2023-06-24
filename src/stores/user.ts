import { defineStore } from "pinia";

type userProps = {
    isMenuOverlay: boolean;
    isLoading: boolean;
    images: string[];
};


export const useUserStore = defineStore("user", {
    state: () =>
    ({
        isMenuOverlay: false,
        isLoading: false,
        images: ["/assets/temp.jpg"],

    } as userProps),

});
