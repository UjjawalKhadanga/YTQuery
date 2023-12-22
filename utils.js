export const getYoutubeIdFromURL = (url) => {
    const urlParsed = new URL(url);
    const videoId = urlParsed.searchParams.get("v");
    return videoId;
}
