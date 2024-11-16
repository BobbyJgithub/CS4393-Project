/**
 * Find the highest resolution image from Ticketmaster image array
 * @param {Array} images - Array of image objects from Ticketmaster API
 * @returns {string} URL of the highest resolution image or undefined
 */
export const getHighestResImage = (images) => {
  if (!images || !images.length) return undefined;
  
  // Try to find 16_9 ratio image first
  const sixteenNine = images.find(img => img.ratio === '16_9');
  if (sixteenNine) return sixteenNine.url;

  // Fall back to first image
  return images[0].url;
};

/**
 * Find a medium resolution image suitable for cards and listings
 * @param {Array} images - Array of image objects from Ticketmaster API
 * @returns {string} URL of medium resolution image or falls back to first image
 */
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