function getRelativeCoords(
  imgHeight: number,
  imgWidth: number,
  x: number,
  y: number,
  xRange: number,
  yRange: number
) {
  // calculated the relative coordinates of a point in an image
  // and a variance tolerance
  const xRel = x / imgWidth;
  const yRel = y / imgHeight;
  const xVarience = Math.abs(xRel - (x + xRange) / imgWidth);
  const yVarience = Math.abs(yRel - (y + yRange) / imgHeight);
  return { xRel, yRel, xVarience, yVarience };
}

export { getRelativeCoords };
