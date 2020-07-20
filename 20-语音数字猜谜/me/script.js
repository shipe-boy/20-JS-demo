let msgEl = document.getElementById('msg');

let randomNum = getRandomNumber();
// let message = new SpeechSynthesisUtterance()
// message.text = randomNum
console.log('正确数字：'+randomNum)
// speechSynthesis.speak(message);
//语音识别
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//开启语音识别
recognition.start()


function onSpeak(e){
	console.log(e)
	let msg = e.result[0][0].transcript;
	
	writeMessage(msg)
	checkNumber(msg);
	
}


function writeMessage(msg){
	msgEl.innerHTML = `
	div>你说的是: </div>
	<span class="box">${msg}</span>
	`;
}

function checkNumber(msg){
	let num = +msg;
	
	if(Number.isNaN(num)){
		msgEl.innerHTML += '<div>说的不是数字！</div>';
		return
	}
	if(num > 100 || num < 1){
		msgEl.innerHTML += '<div>1-100之间的数字亲！</div>';
		return
	}
	
	if(num === randomNum){
		document.body.innerHTML = `
		  <h2>我靠！瞎猫碰见死耗子了。<br><br>
		  数字就是： ${num}</h2>
		  <button class="play-again" id="play-again">再玩一次</button>
		`;
	}else if(num > randomNum){
		msgEl.innerHTML += '<div>说的有点大了，说小点</div>';
	}else {
		msgEl.innerHTML += '<div>在大点</div>';
	}
	
}


function getRandomNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => {
	recognition.start();
})

document.body.addEventListener('click', (e) => {
	if(e.target.id === 'play-again'){
		window.location.reload();
	}
})


