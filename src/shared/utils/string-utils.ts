export const capitalize = ([first, ...rest]: string) => first.toUpperCase() + rest.join('');

export const serializeVideoIdToUrl = (id: string) => {
  return `https://www.youtube.com/watch?v=${id}`;
};

export const deserializeVideoIdFromUrl = (url: string) => {
  return new URL(url).searchParams.get('v') ?? '';
};
