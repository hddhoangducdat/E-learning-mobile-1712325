export const timeCalc = (duration?: number) => {
  if (!duration) return 0;
  var milliseconds = (duration % 1000) / 100,
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const tmp2 = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + tmp2;
};
