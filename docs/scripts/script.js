var video = document.getElementById('video1');
if (video) {
    window.addEventListener('click', function () {
        video.muted = false;
        if (video.paused) {
            video.play();
        }
    });
}
