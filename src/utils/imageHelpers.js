export const getHighestResImage = (images) => {
  if (!images || !images.length) return undefined;
  
  // Create a copy of the images array and sort by width in descending order
  const sortedImages = [...images].sort((a, b) => b.width - a.width);

  // Try to find highest resolution 16_9 ratio image first
  const sixteenNine = sortedImages.find(img => img.ratio === '16_9');
  if (sixteenNine) return sixteenNine.url;

  // Fall back to highest resolution image
  return sortedImages[0].url;
};

export const getMediumResImage = (images) => {
  if (!images || !images.length) return undefined;

  // Create a copy of the images array and sort by width in descending order
  const sortedImages = [...images].sort((a, b) => b.width - a.width);

  // Try to find 3_2 ratio image (good for cards)
  const threeTwo = sortedImages.find(img => img.ratio === '3_2');
  if (threeTwo) return threeTwo.url;

  // Fall back to 16_9 if available
  const sixteenNine = sortedImages.find(img => img.ratio === '16_9');
  if (sixteenNine) return sixteenNine.url;

  // Fall back to first image
  return sortedImages[0].url;
};