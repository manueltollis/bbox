import Topbar from "../components/Topbar";
import BboxPage from "../screens/BboxPage";
import ThanksPage from "../screens/ThanksPage";
import WelcomePage from "../screens/WelcomePage";
import routerStore, { Page } from "../store/routerStore";

const RenderPage = ({ page }: { page: Page }) => {
  switch (page) {
    case "bbox":
      return <BboxPage />;
    case "welcome":
      return <WelcomePage />;
    case "thanks":
      return <ThanksPage />;
  }
};

export const Router = () => {
  const page = routerStore((state) => state.page);
  console.log(page);
  return (
    <div className="flex h-screen flex-col p-2">
      <Topbar />
      <div className="flex-1">
        <RenderPage page={page} />
      </div>
    </div>
  );
};
