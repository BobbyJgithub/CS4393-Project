export const getHighestResImage = (images) => {
  if (!images || !images.length) return undefined;
  
  // Try to find 16_9 ratio image first
  const sixteenNine = images.find(img => img.ratio === '16_9');
  if (sixteenNine) return sixteenNine.url;

  // Fall back to first image
  return images[0].url;
};

export const getMediumResImage = (images) => {
  if (!images || !images.length) return undefined;

  // Try to find 3_2 ratio image (good for cards)
  const threeTwo = images.find(img => img.ratio === '3_2');
  if (threeTwo) return threeTwo.url;

  // Fall back to 16_9 if available
  const sixteenNine = images.find(img => img.ratio === '16_9');
  if (sixteenNine) return sixteenNine.url;

  // Fall back to first image
  return images[0].url;
};