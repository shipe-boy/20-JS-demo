let rulesBtn = document.getElementById('rules-btn');
let closeBtn = document.getElementById('close-btn');
let rules = document.getElementById('rules');
let canvas = document.getElementById('canvas');


let ctx = canvas.getContext('2d');
let score = 0;

let brickRowCount = 9;
let brickColumnCount = 5;
let delay = 500;

//小球
let ball = {
	x: canvas.width / 2,
	y: canvas.height /2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: 4,
	visible: true
}
//跳板
let paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	w: 80,
	h: 10,
	speed: 8,
	dx: 0,
	visible: true
};
//砖块
let brickInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visible: true
}

//砖块数组
let bricks = [];
for(let i = 0; i < brickRowCount; i++){
	bricks[i] = [];	//每一列
	for(let j = 0; j < brickColumnCount; j++){
		//砖块的左上顶点
		let x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
		let y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = {x, y, ...brickInfo}
	}
}

//绘制小球
function drawBall(){
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
	ctx.fill();
	ctx.closePath();
}

//绘制跳板
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
	ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
	ctx.fill();
	ctx.closePath();
}

//绘制砖块
function drawBricks(){
	bricks.forEach(column => {
		column.forEach(brick => {
			ctx.beginPath()
			ctx.rect(brick.x, brick.y, brick.w, brick.h)
			ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
			ctx.fill();
			ctx.closePath();
		})
	})
}

//绘制分数
function drawScore(){
	ctx.font = '20px Arial';
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}


//移动跳板
function movePaddle(){
	paddle.x += paddle.dx;
	
	//边界判断
	if(paddle.x + paddle.w > canvas.width){
		paddle.x = canvas.width - paddle.w
	}
	if(paddle.x < 0){
		paddle.x = 0;
	}
}
//移动小球
function moveBall(){
	ball.x += ball.dx;
	ball.y += ball.dy;
	
	//边界判断  左 和 右
	if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
		ball.dx *= -1
	}
	//上和下
	if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
		ball.dy *= -1
	}
	
	//跳板碰撞判断
	if(
		ball.x - ball.size > paddle.x &&	//跳板左
		ball.x + ball.size < paddle.x + paddle.w && //跳板上
		ball.y + ball.size > paddle.y	//跳板右
	){
		ball.dy = -ball.speed
		// ball.dy *= -1
	}
	
	//砖块碰撞
	bricks.forEach(column => {
		column.forEach(brick => {
			if(brick.visible){
				if(	//判断可以 定右来看左
					ball.x - ball.size > brick.x && //left
					ball.x + ball.size < brick.x + brick.w &&	//right
					ball.y + ball.size > brick.y && 	//top
					ball.y - ball.size < brick.y + brick.h  // bottom
				){
					ball.dy *= -1;
					brick.visible = false;
					
					//分数
					increaseScore()
				}
			}
		})
	})
	
	//游戏失败
	if(ball.y + ball.size > canvas.height){
		showAllBricks();
		score = 0;
	}
	
}


function increaseScore(){
	score++;
	
	//游戏通关
	if(score % (brickColumnCount * brickRowCount) === 0){
		ball.visible = false
		paddle.visible = false
		
		//延迟重新开始游戏
		setTimeout(() => {
			showAllBricks();
			score = 0;
			//跳板位置归位
			paddle.x = canvas.width / 20 - 40;
			paddle.y = canvas.height - 20;
			
			//小球位置归位
			ball.x = canvas.width / 2;
			ball.y = canvas.height / 2;
			
			ball.visible = true
			paddle.visible = true
			
		})
	}
}

//展示全部砖块
function showAllBricks(){
	bricks.forEach(column => {
	  column.forEach(brick => (brick.visible = true));
	});
}

//绘制
function draw(){
	//清空画布
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	drawBall();
	drawPaddle();
	drawScore();
	drawBricks();
}

//动画
function update(){
	movePaddle();
	moveBall();
	
	// Draw everything
	draw();
	
	requestAnimationFrame(update);
}
update()

function keyDown(e){
	if(e.key === 'Right' || e.key === 'ArrowRight'){
		paddle.dx = paddle.speed;
	}else if(e.key === 'Left' || e.key === 'ArrowLeft'){
		paddle.dx = -paddle.speed;
	}
}

function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));










