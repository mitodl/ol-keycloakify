/**
 * This function converts from pixels to rems, assuming a base font size of 16px
 * (which is the default for most modern browsers).
 *
 * Using this function, we can:
 * - match designs that are in pixels for default font size
 * - allow users to scale the font size up or down by changing the base font size.
 *
 * For example, a Chrome user might specify a base font size of 20px ("large")
 * in their browser settings. Then, `pxToRem(32)` would actually be 40px for
 * that user.
 *
 * TODO Export from Smoot Design
 */
const pxToRem = (px: number) => `${px / 16}rem`;

export { pxToRem };
