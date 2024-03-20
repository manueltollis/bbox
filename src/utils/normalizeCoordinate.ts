export const normalizeCoordinate = (
  coordinate: number,
  imageDimension: number,
) => {
  return +((coordinate / imageDimension) * 100).toFixed(4);
};
