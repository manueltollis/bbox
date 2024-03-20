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

type Coordinates = {
  x: number;
  y: number;
};

const BboxPage = () => {
  const { isLoading, data } = useGetImage();

  const { mutate: submitBbox, isPending } = useSubmitBoundingBox();

  const topLeftCoordinates = useRef<Coordinates | null>();
  const bottomRightCoordinates = useRef<Coordinates | null>();

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

      <Button
        disabled={isPending}
        className="mt-4 w-full"
        loading={isPending}
        onClick={() =>
          submitBbox({
            id: data?.id,
            boundingBox: {
              topLeft: topLeftCoordinates.current!,
              bottomRight: bottomRightCoordinates.current!,
            },
          })
        }
      >
        Submit
      </Button>
    </div>
  );
};

export default BboxPage;
