var bird = new Image();
bird.src = "img/birdR.png"

function initCanvas() {
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
    var birdX = ctx.canvas.width / 2 - bird.width / 2;
    var birdY = 100;
    var xDirection = 1;
    var yDirection = 1;

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        ctx.drawImage(bird, birdX, birdY);
        birdX += 1 * xDirection;
        birdY += 5 * yDirection;

        if(birdX >= 450) {
            birdX = 450;
            xDirection = -1;
            bird.src = 'img/birdL.png';
        }
        else if(birdX <= 0) {
            birdX = 0;
            xDirection = 1;
            bird.src = 'img/birdR.png';
        }
        if(birdY >= 560) {
            birdY = 560;
            yDirection = -1;
        }
        else if(birdY <= 0) {
            birdY = 0;
            yDirection = 1;
        }

        /*
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
*/
        ctx.restore();
    }
    var animateInterval = setInterval(animate, 15);
}

window.addEventListener('load', function(event) {
    initCanvas();
});