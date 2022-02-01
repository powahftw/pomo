import { createMedia } from '@artsy/fresnel';

const appMedia = createMedia({
  breakpoints: {
    narrow: 0,
    wide: 1024,
  },
});

export const mediaStyle = appMedia.createMediaStyle();
export const { Media, MediaContextProvider } = appMedia;
