import Topbar from "../components/Topbar";
import BboxPage from "../screens/BboxPage";
import routerStore from "../store/routerStore";

export const Router = () => {
  const page = routerStore((state) => state.page);
  return (
    <div className="h-screen p-2">
      <Topbar />
      {page === "bbox" && <BboxPage />}
    </div>
  );
};
