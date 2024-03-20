import { Cropper, CropperRef, ImageRestriction } from "react-advanced-cropper";
import { useGetImage } from "../api/useGetImage";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/bubble.css";

import { normalizeCoordinate } from "../utils/normalizeCoordinate";
import { useRef } from "react";
import "./BBoxPage.style.css";

type Coordinates = {
  x: number;
  y: number;
};

const BboxPage = () => {
  const { isLoading, data } = useGetImage();

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

      <Cropper
        onChange={onCrop}
        src={imageUrl}
        stencilProps={{
          color: "rgba(100, 0, 0, 0.5)",
        }}
        className={"cropper text-primary w-full rounded-md"}
        imageRestriction={ImageRestriction.stencil}
        defaultSize={({ imageSize, visibleArea }) => {
          return {
            width: (visibleArea || imageSize).width,
            height: (visibleArea || imageSize).height,
          };
        }}
      />
    </div>
  );
};

export default BboxPage;
