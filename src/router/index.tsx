import Topbar from "../components/Topbar";
import BboxPage from "../screens/BboxPage";
import WelcomePage from "../screens/WelcomePage";
import routerStore, { Page } from "../store/routerStore";

const RenderPage = ({ page }: { page: Page }) => {
  switch (page) {
    case "bbox":
      return <BboxPage />;
    case "welcome":
      return <WelcomePage />;
  }
};

export const Router = () => {
  const page = routerStore((state) => state.page);
  return (
    <div className="flex h-screen flex-col p-2">
      <Topbar />
      <div className="flex-1">
        <RenderPage page={page} />
      </div>
    </div>
  );
};
