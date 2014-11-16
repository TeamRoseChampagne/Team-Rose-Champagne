var bird = new Image();
bird.src = "img/birdR.png";

function initCanvas() {
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
    var centerX = cW / 2, centerY = cH / 2;
    var birdX = ctx.canvas.width / 2 - bird.width / 2;
    var birdY = 100;
    var xDirection = 1;
    var yDirection = 1;
    var score = 0;

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        scoreCircle();
        scorePoints();

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
            score++;
        }
        else if(birdX <= 0) {
            birdX = 0;
            xDirection = 1;
            bird.src = 'img/birdR.png';
            score++;
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
            maxJump = birdY - 60;
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

    function scoreCircle() {
        var radius = 150;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#D2C1C1";
        ctx.fill();
    }

    function scorePoints() {
        ctx.fillStyle = "gray";
        ctx.font = "bold 130px sans-serif";
        if (score < 10) {
            ctx.fillText(score, 210, 350);
        }
        else if (score < 100) {
            ctx.fillText(score, 160, 350);
        }
        else {
            ctx.fillText(score, 110, 350);
        }

    }

    function upperSpikes() {
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
        ctx.fillStyle='#BE2116';
        ctx.fill();
    }

    function lowerSpikes() {
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
        ctx.fillStyle='#BE2116';
        ctx.fill();
    }
}

window.addEventListener('load', function(event) {
    initCanvas();
});
