var bird = new Image();
bird.src = "img/birdR.png"

function initCanvas() {
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
    var birdX = ctx.canvas.width / 2 - bird.width / 2;
    var birdY = 100;

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        ctx.drawImage(bird, birdX, birdY);
        if (birdY == cH - 40) {
            birdY -= 5;
        }
        if (birdX == cW - 50) {
            birdX -= 5;
            birdY += 5;
        }
        else {
            birdX ++;
            birdY += 5;
        }

        ctx.restore();
    }
    var animateInterval = setInterval(animate, 15);
}

window.addEventListener('load', function(event) {
    initCanvas();
});