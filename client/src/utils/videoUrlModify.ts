export const videoUrlModify = (videoUrl: string) => {
  try {
    if (videoUrl.includes("watch?v=")) {
      const url = videoUrl.split("&")[0];
      return url.replace("watch?v=", "/embed/");
    }
  } catch (err) {
    console.log(err);
  }
  return videoUrl;
};
