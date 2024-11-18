
const video = document.getElementById('video1') as HTMLVideoElement;

if (video) {

    window.addEventListener('click', () => {
        video.muted = false;

        if (video.paused) {
            video.play();
        }
    });
}
