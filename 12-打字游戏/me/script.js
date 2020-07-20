let word = document.getElementById('word');
let text = document.getElementById('text');
let scoreEl = document.getElementById('score');
let timeEl = document.getElementById('time');
let endgameEl = document.getElementById('end-game-container');
let settingsBtn = document.getElementById('settings-btn');
let settings = document.getElementById('settings');
let settingForm = document.getElementById('settings-form');
let difficultySelect = document.getElementById('difficulty');

let words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfalutin',
	'superficial',
	'quince',
	'eight',
	'feeble',
	'admit',
	'drag',
	'loving'
];
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = difficulty;

text.focus();

//计时器
let timeInterval = setInterval(updateTime, 1000);
function updateTime(){
	time--;
	timeEl.innerHTML = time + 's';
	
	if(time === 0){
		clearInterval(timeInterval)
		
		//游戏结束
		gameOver()
	}
}


//游戏结束
function gameOver(){
	endgameEl.innerHTML = `
	<h1>时间到</h1>
	<p>Your final score is ${score}</p>
	<button onclick="location.reload()">Reload</button>
	`;
	
	endgameEl.style.display = 'flex';
}

//添加单词
function addWordToDOM(){
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}

//随机选择单词
function getRandomWord(){
	return words[Math.floor(Math.random() * words.length)];
}

//更新分数
function updateScore(){
	score++;
	scoreEl.innerHTML = score;
}


addWordToDOM();

text.addEventListener('input', e => {
	let insertedText = e.target.value;
	
	if(insertedText === randomWord){
		addWordToDOM();
		updateScore();
		
		//清空文本
		e.target.value = ''
		
		//难度选择
		if(difficulty === 'hard'){
			time += 2;
		}else if(difficulty === 'medium'){
			time += 3;
		}else{
			time += 5;
		}
		
		updateTime()
	}
})


//设置按钮
settingsBtn.addEventListener('click', () => {
	settings.classList.toggle('hide')
})

//难度选择
settingForm.addEventListener('change', (e) => {
	difficulty = e.target.value;
	localStorage.setItem('difficulty', difficulty)
})


