import { defineStore } from "pinia";

type userProps = {
  isMenuOverlay: boolean;
  isLoading: boolean;
  image: string | null;
};

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      isMenuOverlay: false,
      isLoading: false,
      image: "",
    } as userProps),
  persist: true,
});
