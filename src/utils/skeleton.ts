/**
 * A utility for adding a skeleton loading effects and accessibility attributes.
 *
 * @use `<span {...skeleton({ loading: true })}>mocked text</span>`
 */
export const skeleton = ({
  loading,
  image,
}: {
  loading?: boolean;
  /**
   * The skeleton effect uses an animated `background`, but the image loads over it. Replacing the `<img />`'`src` with a 1x1px transparent GIF preserves dimensions while minimising network load.
   */
  image?: boolean;
}) => {
  if (loading) {
    return {
      "aria-busy": true,
      "aria-live": "polite",
      tabIndex: -1,
      "data-skeleton-loading": true,
      ...(image ? { src: "/src/images/empty.gif" } : {}),
    } as const;
  }

  return {};
};