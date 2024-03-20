import rapidataLogo from "../assets/logo_with_name.svg";

const ThanksPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4">
      <img src={rapidataLogo} alt="Rapidata" className="w-64" />
      <h1 className="text-center text-2xl">Thanks for your submissions!</h1>
    </div>
  );
};

export default ThanksPage;
