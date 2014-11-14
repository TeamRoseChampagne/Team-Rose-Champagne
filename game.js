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
        upperSpikes();
        lowerSpikes();
        ctx.restore();
    }
    var animateInterval = setInterval(animate, 15);
    function upperSpikes() {
        ctx.beginPath();
        ctx.moveTo(50,0);
        ctx.lineTo(75, 25);
        ctx.lineTo(100, 0);
        ctx.lineTo(125, 25);
        ctx.lineTo(150, 0);
        ctx.lineTo(175, 25);
        ctx.lineTo(200, 0);
        ctx.lineTo(225, 25);
        ctx.lineTo(250, 0);
        ctx.lineTo(275, 25);
        ctx.lineTo(300, 0);
        ctx.lineTo(325, 25);
        ctx.lineTo(350, 0);
        ctx.lineTo(375, 25);
        ctx.lineTo(400, 0);
        ctx.lineTo(425, 25);
        ctx.lineTo(450, 0);
        ctx.closePath();
        ctx.stroke();
    }

    function lowerSpikes() {
        ctx.beginPath();
        ctx.moveTo(50,600);
        ctx.lineTo(75, 575);
        ctx.lineTo(100, 600);
        ctx.lineTo(125, 575);
        ctx.lineTo(150, 600);
        ctx.lineTo(175, 575);
        ctx.lineTo(200, 600);
        ctx.lineTo(225, 575);
        ctx.lineTo(250, 600);
        ctx.lineTo(275, 575);
        ctx.lineTo(300, 600);
        ctx.lineTo(325, 575);
        ctx.lineTo(350, 600);
        ctx.lineTo(375, 575);
        ctx.lineTo(400, 600);
        ctx.lineTo(425, 575);
        ctx.lineTo(450, 600);
        ctx.closePath();
        ctx.stroke();
    }
}

window.addEventListener('load', function(event) {
    initCanvas();
});