var bird = new Image();
bird.src = "img/birdR.png"

function initCanvas() {
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
    var birdY = 100;

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        ctx.drawImage(bird, ctx.canvas.width / 2 - bird.width / 2, birdY);
        if (birdY == 650) {
            birdY = 200;
        }
        else {
            birdY+=5;
        }

        ctx.restore();
    }
    var animateInterval = setInterval(animate, 15);
}

window.addEventListener('load', function(event) {
    initCanvas();
});