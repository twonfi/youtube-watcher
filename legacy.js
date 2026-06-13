'use strict';

const YOUTUBE_VIDEO_ID_REGEX = /^[A-Za-z0-9-_]{11}$/;
const URL_PARAMS = new URLSearchParams(window.location.search);

globalThis.videoId = (URL_PARAMS.get('v') && YOUTUBE_VIDEO_ID_REGEX.test(URL_PARAMS.get('v'))) ? URL_PARAMS.get('v') : 'aqz-KE-bpKQ';
frame.setAttribute('src', `https://www.youtube-nocookie.com/embed/${globalThis.videoId}?autoplay=1&rel=0`);
document.getElementById('url').value = globalThis.videoId;

document.getElementById('controls-hide').addEventListener('click', () => {
    document.getElementById('controls-hideable').toggleAttribute('hidden');
});

function updateYouTubeEmbed() {
    try {
        const frame = document.getElementById('frame');
        const input = document.getElementById('url');
        const inputValue = document.getElementById('url').value;

        if (YOUTUBE_VIDEO_ID_REGEX.test(inputValue)) {
            globalThis.videoId = inputValue;
        } else if (URL.canParse(inputValue)) {
            const url = new URL(inputValue);
            if (['youtube.com', 'www.youtube.com'].includes(url.hostname)) {
                const videoId = url.searchParams.get('v');
                if (url.pathname === '/watch' && YOUTUBE_VIDEO_ID_REGEX.test(videoId)) {
                    globalThis.videoId = videoId;
                } else {
                    throw new Error('YouTube long URL is not a valid video link');
                }
            } else if (url.hostname === 'youtu.be') {
                const videoId = url.pathname.slice(1);
                if (YOUTUBE_VIDEO_ID_REGEX.test(videoId)) {
                    globalThis.videoId = videoId;
                } else {
                    throw new Error('youtu.be URL does not have valid video ID');
                }
            } else {
                throw new Error('URL is not a YouTube video link');
            }
        } else {
            throw new Error('Input is not a YouTube video link or ID');
        }

        input.value = globalThis.videoId;
        frame.setAttribute('src', `https://www.youtube-nocookie.com/embed/${globalThis.videoId}?autoplay=1&rel=0`);

        const pageUrl = new URL(window.location.href);
        pageUrl.searchParams.set('v', globalThis.videoId);
        window.history.replaceState(null, '', pageUrl.toString());
    } catch (e) {
        alert(e);
    }
}

document.getElementById('go').addEventListener('click', updateYouTubeEmbed);
