import rapidataLogo from "../assets/logo.svg";

const Topbar = () => {
  return (
    <div className="border-b-primary/15 mx-auto mb-2 flex w-11/12 justify-center border-b py-2">
      <img src={rapidataLogo} alt="Rapidata" className="h-6 w-6" />
    </div>
  );
};

export default Topbar;
