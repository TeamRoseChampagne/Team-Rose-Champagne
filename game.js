var bird = new Image();
bird.src = "img/birdR.png";

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
        //game speed controls
        var game = true;
        if (game) {
            birdX += 2 * xDirection;
            birdY += 3 * yDirection;
        }

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
        if (birdY >= 540) {
            birdY = 540;
            yDirection = 0;
        }
        else if(birdY <= 0) {
            birdY = 0;
            yDirection = 1;
        }
        function jump() {
            yDirection = -2;
            if (xDirection > 0) {
                xDirection = 2;
            }
            else {
                xDirection = -2;
            }
        }
        
        //event listener for mouseclick - the bird jumps
        document.addEventListener('mousedown', function (e) {
            jump();
            maxJump = birdY - 150;
        });
        upperSpikes();
        lowerSpikes();

        ctx.restore();

        //begin to fall again after jump
        if (birdY <= maxJump) {
            yDirection = 1;
            if (xDirection > 0) {
                xDirection = 1;
            }
            else {
                xDirection = -1;
            }
        }

        
    }
    var animateInterval = setInterval(animate, 15);

    function upperSpikes() {
        ctx.fillStyle='#BE2116';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(25,0);
        ctx.lineTo(50, 25);
        ctx.lineTo(75, 0);
        ctx.lineTo(100, 25);
        ctx.lineTo(125, 0);
        ctx.lineTo(150, 25);
        ctx.lineTo(175, 0);
        ctx.lineTo(200, 25);
        ctx.lineTo(225, 0);
        ctx.lineTo(250, 25);
        ctx.lineTo(275, 0);
        ctx.lineTo(300, 25);
        ctx.lineTo(325, 0);
        ctx.lineTo(350, 25);
        ctx.lineTo(375, 0);
        ctx.lineTo(400, 25);
        ctx.lineTo(425, 0);
        ctx.lineTo(450, 25);
        ctx.lineTo(475, 0);
        ctx.closePath();
        ctx.stroke();
    }

    function lowerSpikes() {
        ctx.fillStyle='#BE2116';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(25,600);
        ctx.lineTo(50, 575);
        ctx.lineTo(75, 600);
        ctx.lineTo(100, 575);
        ctx.lineTo(125, 600);
        ctx.lineTo(150, 575);
        ctx.lineTo(175, 600);
        ctx.lineTo(200, 575);
        ctx.lineTo(225, 600);
        ctx.lineTo(250, 575);
        ctx.lineTo(275, 600);
        ctx.lineTo(300, 575);
        ctx.lineTo(325, 600);
        ctx.lineTo(350, 575);
        ctx.lineTo(375, 600);
        ctx.lineTo(400, 575);
        ctx.lineTo(425, 600);
        ctx.lineTo(450, 575);
        ctx.lineTo(475, 600);
        ctx.closePath();
        ctx.stroke();
    }
}

window.addEventListener('load', function(event) {
    initCanvas();
});
