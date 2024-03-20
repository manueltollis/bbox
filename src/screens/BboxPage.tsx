import { Cropper, CropperRef, ImageRestriction } from "react-advanced-cropper";
import { useGetImage } from "../api/useGetImage";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/bubble.css";

import { normalizeCoordinate } from "../utils/normalizeCoordinate";
import { useRef } from "react";
import "./BBoxPage.style.css";
import { useSubmitBoundingBox } from "../api/useSubmitBoundingBox";
import { Button } from "../components/Button";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import routerStore from "../store/routerStore";

type Coordinates = {
  x: number;
  y: number;
};

const BboxPage = () => {
  const { isLoading, data } = useGetImage();

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

  const imageUrl = `/assets/${data?.fileName}`;

  return (
    <div className="flex h-full flex-col gap-2">
      <h1 className="text-center text-xl">Where is the {data?.target}?</h1>
      <div className="flex-1">
        <Cropper
          onChange={onCrop}
          src={imageUrl}
          className={"cropper w-full rounded-md"}
          transitions={false}
          imageRestriction={ImageRestriction.stencil}
          defaultSize={({ imageSize, visibleArea }) => {
            return {
              width: (visibleArea || imageSize).width,
              height: (visibleArea || imageSize).height,
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
          onClick={async () => {
            try {
              await submitBbox({
                id: data?.id,
                boundingBox: {
                  topLeft: topLeftCoordinates.current!,
                  bottomRight: bottomRightCoordinates.current!,
                },
              });

              navigateTo("thanks");
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BboxPage;
