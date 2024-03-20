import { Cropper, CropperRef, ImageRestriction } from "react-advanced-cropper";
import { useGetImage } from "../api/useGetImage";
import { normalizeCoordinate } from "../utils/normalizeCoordinate";
import { useRef, useState } from "react";
import { useSubmitBoundingBox } from "../api/useSubmitBoundingBox";
import { Button } from "../components/Button";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import routerStore from "../store/routerStore";
import ProgressBar from "../components/ProgressBar";

import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/bubble.css";
import "./BBoxPage.style.css";

const MAX_STEPS = 3;
const INITIAL_STEP = 1;

type Coordinates = {
  x: number;
  y: number;
};

const BboxPage = () => {
  const [step, setStep] = useState(INITIAL_STEP);

  const progress = (step / (MAX_STEPS + 1)) * 100;

  const { isLoading, data, refetch } = useGetImage();

  const navigateTo = routerStore((state) => state.navigateTo);

  const { mutateAsync: submitBbox, isPending } = useSubmitBoundingBox();

  const topLeftCoordinates = useRef<Coordinates | null>();
  const bottomRightCoordinates = useRef<Coordinates | null>();

  /**
   * Fake function that would call an API to submit the absence of a target in the image
   */
  const noTargetHandler = async () => {
    console.log("No target");
  };

  const onCrop = (cropper: CropperRef) => {
    const coordinates = cropper.getCoordinates({
      round: true,
    });
    const imageSource = cropper.getImage();

    if (!coordinates || !imageSource) {
      return;
    }

    const { height, left, top, width } = coordinates;

    const right = left + width;
    const bottom = top + height;

    const { height: imageHeight, width: imageWidth } = imageSource;

    topLeftCoordinates.current = {
      x: normalizeCoordinate(left, imageWidth),
      y: normalizeCoordinate(top, imageHeight),
    };

    bottomRightCoordinates.current = {
      x: normalizeCoordinate(right, imageWidth),
      y: normalizeCoordinate(bottom, imageHeight),
    };

    console.table({
      topLeftCoordinates: topLeftCoordinates.current,
      bottomRightCoordinates: bottomRightCoordinates.current,
    });
  };

  if (isLoading || !data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CircleLoader />
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      await submitBbox({
        id: data.id,
        boundingBox: {
          topLeft: topLeftCoordinates.current!,
          bottomRight: bottomRightCoordinates.current!,
        },
      });

      if (step === MAX_STEPS) {
        navigateTo("thanks");
      } else {
        setStep((prev) => prev + 1);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const imageUrl = `/assets/${data.fileName}`;

  return (
    <div className="flex h-full flex-col gap-2">
      <ProgressBar fill={progress} />
      <h1 className="text-center text-xl">Where is the {data?.target}?</h1>
      <div className="flex-1">
        <Cropper
          onChange={onCrop}
          src={imageUrl}
          className={"cropper w-full rounded-md"}
          transitions={false}
          imageRestriction={ImageRestriction.stencil}
          defaultSize={({ imageSize, visibleArea }) => {
            const width =
              (visibleArea || imageSize).width -
              (visibleArea || imageSize).width * 0.1;

            const height =
              (visibleArea || imageSize).height -
              (visibleArea || imageSize).height * 0.1;

            return {
              width,
              height,
            };
          }}
        />
      </div>

      <div className="mt-4 flex flex-row items-center gap-2">
        <Button
          className="flex-1"
          onClick={noTargetHandler}
          variant="secondary"
        >
          No {data?.target} here
        </Button>
        <Button
          disabled={isPending}
          className="flex-1"
          loading={isPending}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BboxPage;
