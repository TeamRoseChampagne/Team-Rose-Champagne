var bird = new Image();
bird.src = "img/birdR.png";

var jumpSound = new Audio();
jumpSound.src = "resources/jump.wav";
var wallHitSound = new Audio();
wallHitSound.src = "resources/wall-hit.wav";

function mainMenu() {

    var mM = document.getElementById('my_canvas').getContext('2d');

    bird.src = "img/birdR.png";

    //event listeners for the main manu
    var mouseMoveListener = function(e) {
        var mouseX = e.clientX - mM.canvas.offsetLeft;
        var mouseY = e.clientY - mM.canvas.offsetTop;

        if (mouseX >= 300 && mouseX <= 460 && mouseY >= 160 && mouseY <= 230) {

            mM.fillStyle = "lightgray";
            mM.font = "bold 80px Birds, sans-serif";
            mM.fillText("Play", 300, 230);
            mM.strokeText("Play", 300, 230);

        }

        else {

            mM.fillStyle = "white";
            mM.font = "bold 80px Birds, sans-serif";
            mM.fillText("Play", 300, 230);
            mM.strokeText("Play", 300, 230);

        }
    }
    var playClickListener = function(e) {
        var mouseX = e.clientX - mM.canvas.offsetLeft;
        var mouseY = e.clientY - mM.canvas.offsetTop;

        if (mouseX >= 300 && mouseX <= 460 && mouseY >= 160 && mouseY <= 230) {
            mM.canvas.removeEventListener('mousemove', mouseMoveListener, false);
            mM.canvas.removeEventListener('click', playClickListener, false);
            play = true;
            initCanvas();
        }
    }
    mM.canvas.addEventListener('mousemove', mouseMoveListener, false);
    mM.canvas.addEventListener('click', playClickListener, false);


    mM.fillStyle = "red";
    mM.fillRect(0, 0, 500, 600);

    mM.fillStyle = "lightgray";
    mM.font = "bold 70px Birds, sans-serif";

    mM.fillText("DON'T", 70, 100);
    mM.strokeText("DON'T", 70, 100);

    mM.fillText("HIT", 30, 230);
    mM.strokeText("HIT", 30, 230);

    mM.fillText("THE", 110, 340);
    mM.strokeText("THE", 110, 340);

    mM.font = "bold 130px Birds, sans-serif";
    mM.fillText("SPIKES", 50, 530);
    mM.strokeText("SPIKES", 50, 530);

    mM.font = "bold 10px sans-serif";
    mM.fillText("\u00A9 Team Rose Champagne ", 350, 590);
    mM.strokeText("", 300, 580);

}

function initCanvas() {

    var ctx = document.getElementById('my_canvas').getContext('2d');
    var cW = ctx.canvas.width;
    var cH = ctx.canvas.height;
    var centerX = cW / 2;
    var centerY = cH / 2;
    var birdX = ctx.canvas.width / 2 - bird.width / 2;
    var birdY = 100;
    var xDirection = 1;
    var yDirection = 1;
    var gameSpeed = 3;
    var score = 0;
    var game = true;


    var animateInterval = setInterval(animate, 15);

    function animate() {

        ctx.save();
        ctx.clearRect(0, 0, cW, cH);

        setGameSpeed();
        scoreCircle();
        scorePoints();
        drawSpikes();
        birdMovement();
        landJump();
        if(!game) {
            gameOver();
        }

        ctx.restore();
    }

    function setGameSpeed() {

        if(score <= 10)
            gameSpeed = 3;
        else if(score <= 20)
            gameSpeed = 4;
        else
            gameSpeed = 5;
    }

    function birdMovement() {

        ctx.drawImage(bird, birdX, birdY);

        birdX += gameSpeed * xDirection;
        birdY += (gameSpeed + 1) * yDirection;

        if(birdX >= 450) {
            birdX = 450;
            xDirection = -1;
            bird.src = 'img/birdL.png';
            score++;
            wallHitSound.play();
        }
        else if(birdX <= 0) {
            birdX = 0;
            xDirection = 1;
            bird.src = 'img/birdR.png';
            score++;
            wallHitSound.play();
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
            jumpSound.play();
            jump();
            maxJump = birdY - 100;
        });
    }

    function landJump() {
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
            ctx.fillText(score, 215, 350);
        }
        else if (score < 100) {
            ctx.fillText(score, 175, 350);
        }
        else {
            ctx.fillText(score, 135, 350);
        }

    }

    function drawSpikes() {

        upperSpikes();
        lowerSpikes();

        if (birdX < 350 && xDirection < 0) {
            drawLeftSpikes();
            if (birdX >= 350 && xDirection < 0) {
                drawRightSpikes();
            }
        }

        else if (birdX > 150 && xDirection > 0) {
            drawRightSpikes();
            if (birdX <= 150 && xDirection < 0) {
                drawLeftSpikes();
            }
        }
    }

    var leftSpikes = [ {"x" : "0", "y" : "50", "tipX" : "25", "tipY" : "75", "endY" : "100"},
                       {"x" : "0", "y" : "150", "tipX" : "25", "tipY" : "175", "endY" : "200"},
                       {"x" : "0", "y" : "250", "tipX" : "25", "tipY" : "275", "endY" : "300"},
                       {"x" : "0", "y" : "350", "tipX" : "25", "tipY" : "375", "endY" : "400"},
                       {"x" : "0", "y" : "450", "tipX" : "25", "tipY" : "475", "endY" : "500"},
                       {"x" : "0", "y" : "550", "tipX" : "25", "tipY" : "575", "endY" : "600"}
    ];

    var rightSpikes = [ {"x" : "500", "y" : "50", "tipX" : "475", "tipY" : "75", "endY" : "100"},
                        {"x" : "500", "y" : "150", "tipX" : "475", "tipY" : "175", "endY" : "200"},
                        {"x" : "500", "y" : "250", "tipX" : "475", "tipY" : "275", "endY" : "300"},
                        {"x" : "500", "y" : "350", "tipX" : "475", "tipY" : "375", "endY" : "400"},
                        {"x" : "500", "y" : "450", "tipX" : "475", "tipY" : "475", "endY" : "500"},
                        {"x" : "500", "y" : "550", "tipX" : "475", "tipY" : "575", "endY" : "600"}
    ];

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

        if (birdY <= 20) {
            game = false;
        }
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

        if (birdY + 35 > 570) {
            game = false;
        }
    }

    function drawLeftSpikes() {

        if (score <= 10) {
            var positions = [];
            if (score % 3) {
                positions = [2, 4];
            }
            else {
                positions = [0, 3];
            }

            for (var i = 0; i < 2; i++) {
                var ls = leftSpikes[positions[i]];
                ctx.beginPath();
                ctx.moveTo(ls.x, ls.y);
                ctx.lineTo(ls.tipX, ls.tipY);
                ctx.lineTo(ls.x, ls.endY);
                ctx.closePath();
                ctx.fillStyle='#BE2116';
                ctx.stroke();
                ctx.fill();

                if (birdX <= ls.tipX - 18 && birdY < ls.endY - 20 && birdY + 20 > ls.y) {
                    game = false;
                }
            }
        }

        else if (score <= 20) {
            var positions = [];
            if (score % 5) {
                positions = [1, 2, 4];
            }
            else if (score % 13) {
                positions = [1, 3, 4];
            }
            else {
                positions = [0, 2, 3];
            }

            for (var i = 0; i < 3; i++) {
                var ls = leftSpikes[positions[i]];
                ctx.beginPath();
                ctx.moveTo(ls.x, ls.y);
                ctx.lineTo(ls.tipX, ls.tipY);
                ctx.lineTo(ls.x, ls.endY);
                ctx.closePath();
                ctx.fillStyle='#BE2116';
                ctx.stroke();
                ctx.fill();

                if (birdX <= ls.tipX - 18 && birdY < ls.endY - 20 && birdY + 20 > ls.y) {
                    game = false;
                }
            }
        }

        else {
            var positions = [];
            if (score % 5) {
                positions = [0, 1, 2, 4];
            }
            else if (score % 3) {
                positions = [0, 2, 3, 4];
            }
            else {
                positions = [1, 2, 3, 5];
            }

            for (var i = 0; i < 4; i++) {
                var ls = leftSpikes[positions[i]];
                ctx.beginPath();
                ctx.moveTo(ls.x, ls.y);
                ctx.lineTo(ls.tipX, ls.tipY);
                ctx.lineTo(ls.x, ls.endY);
                ctx.closePath();
                ctx.fillStyle='#BE2116';
                ctx.stroke();
                ctx.fill();

                if (birdX <= ls.tipX - 18 && birdY < ls.endY - 20 && birdY + 20 > ls.y) {
                    game = false;
                }
            }
        }
    }

    function drawRightSpikes() {
        if (score <= 10) {
            var positions = [];
            if (score % 4) {
                positions = [3, 4];
            }
            else {
                positions = [1, 3];
            }

            for (var i = 0; i < 2; i++) {
                var rs = rightSpikes[positions[i]];
                ctx.beginPath();
                ctx.moveTo(rs.x, rs.y);
                ctx.lineTo(rs.tipX, rs.tipY);
                ctx.lineTo(rs.x, rs.endY);
                ctx.closePath();
                ctx.fillStyle='#BE2116';
                ctx.stroke();
                ctx.fill();

                if (birdX + 35 >= rs.tipX  && birdY < rs.endY - 20 && birdY + 20 > rs.y) {
                    game = false;
                }
            }
        }

        else if (score <= 20) {
            var positions = [];
            if (score % 14) {
                positions = [1, 2, 4];
            }
            else if (score % 6) {
                positions = [2, 3, 4];
            }
            else {
                positions = [2, 4, 5];
            }

            for (var i = 0; i < 3; i++) {
                var rs = rightSpikes[positions[i]];
                ctx.beginPath();
                ctx.moveTo(rs.x, rs.y);
                ctx.lineTo(rs.tipX, rs.tipY);
                ctx.lineTo(rs.x, rs.endY);
                ctx.closePath();
                ctx.fillStyle='#BE2116';
                ctx.stroke();
                ctx.fill();

                if (birdX + 35 >= rs.tipX  && birdY < rs.endY - 20 && birdY + 20 > rs.y) {
                    game = false;
                }
            }
        }

        else {
            var positions = [];
            if (score % 8) {
                positions = [0, 2, 3, 4];
            }
            else if (score % 6) {
                positions = [1, 2, 3, 5];
            }
            else {
                positions = [0, 1, 2, 4];
            }

            for (var i = 0; i < 4; i++) {
                var rs = rightSpikes[positions[i]];
                ctx.beginPath();
                ctx.moveTo(rs.x, rs.y);
                ctx.lineTo(rs.tipX, rs.tipY);
                ctx.lineTo(rs.x, rs.endY);
                ctx.closePath();
                ctx.fillStyle='#BE2116';
                ctx.stroke();
                ctx.fill();

                if (birdX + 35 >= rs.tipX  && birdY < rs.endY - 20 && birdY + 20 > rs.y) {
                    game = false;
                }
            }
        }

    }

    function gameOver() {
        clearInterval(animateInterval);
        alert("GAME OVER! \nYour score is " + score);
        mainMenu();
    }

}

window.addEventListener('load', function(event) {
    mainMenu();
});
