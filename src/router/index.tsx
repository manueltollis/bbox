import Topbar from "../components/Topbar";
import BboxPage from "../screens/BboxPage";
import routerStore from "../store/routerStore";

export const Router = () => {
  const page = routerStore((state) => state.page);
  return (
    <div className="flex h-screen flex-col p-2">
      <Topbar />
      <div className="flex-1">{page === "bbox" && <BboxPage />}</div>
    </div>
  );
};
