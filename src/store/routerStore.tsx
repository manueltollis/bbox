import { create } from "zustand";

type Page = "bbox";

const routerStore = create<{
  page: Page;
}>(() => ({
  page: "bbox",
}));

export default routerStore;
