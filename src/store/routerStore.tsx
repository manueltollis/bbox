import { create } from "zustand";

export type Page = "bbox" | "welcome" | "thanks";

const routerStore = create<{
  page: Page;
  navigateTo: (page: Page) => void;
}>((set) => ({
  page: "welcome",
  navigateTo: (page) => set({ page }),
}));

export default routerStore;
