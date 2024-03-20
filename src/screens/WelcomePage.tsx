import rapidataLogo from "../assets/logo_with_name.svg";
import { Button } from "../components/Button";
import routerStore from "../store/routerStore";
import CircleLoader from "../components/CircleLoader/CircleLoader";

const WelcomePage = () => {
  const { navigateTo } = routerStore();

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4">
      <img src={rapidataLogo} alt="Rapidata" className="w-64" />

      <div className=" flex flex-1 flex-col items-center justify-center gap-8">
        <h1 className="text-center text-2xl">
          Draw a box around the target in the following pictures
        </h1>
        <p className="text-center">
          The faster you are and the faster you will close this ad!
        </p>
      </div>

      <Button onClick={() => navigateTo("bbox")} className="w-full">
        Understood!
      </Button>
    </div>
  );
};

export default WelcomePage;
