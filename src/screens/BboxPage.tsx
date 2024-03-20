import { Cropper } from "react-advanced-cropper";
import { useGetImage } from "../api/useGetImage";
import "react-advanced-cropper/dist/style.css";

const BboxPage = () => {
  const { isLoading, data } = useGetImage();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="border-primary h-32 w-32 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }
  const imageUrl = `/assets/${data?.fileName}`;

  return (
    <div>
      <h1 className="text-center text-xl">Where is the {data?.target}?</h1>

      <Cropper src={imageUrl} className={"cropper w-full rounded-md"} />
    </div>
  );
};

export default BboxPage;
