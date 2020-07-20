let wordEl = document.getElementById('word');
let wrongLettersEl = document.getElementById('wrong-letters');
let playAgainBtn = document.getElementById('play-button');
let popup = document.getElementById('popup-container');
let notification = document.getElementById('notification-container');
let finalMessage = document.getElementById('final-message');
let finalMessageRevealWord = document.getElementById('final-message-reveal-word');

let figureParts = document.querySelectorAll('.figure-part')

let words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

let correctLetters = [];//输入正确的字母
let wrongLetters = [];//输入错误的字母

function displayWord(){
	wordEl.innerHTML = ` 
	${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}`;
			
			
	let innerWord = wordEl.innerHTML.replace(/[ \n]/g, '');
	
	if(innerWord === selectedWord){
		finalMessage.innerText = "恭喜你，成功通过！"
		popup.style.display = 'flex';
		
		playable = false;
	}
}

//更新错误的字母
function updateWrongLettersEl(){
	//展示错误的字母
	wrongLettersEl.innerHTML = `
	${wrongLetters.length > 0  ? '<p>Wrong</p>' : ''}
	${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;
	
	//展示小人
	figureParts.forEach((part, index) => {
		let errors = wrongLetters.length;
		
		if(index < errors){
			part.style.display = 'block';
		}else{
			part.style.display = 'none';
		}
	})
	
	if(wrongLetters.length === figureParts.length){
		finalMessage.innerText = "唉！你还是输了！！！";
		finalMessageRevealWord.innerText = `单词是：${selectedWord}，笨蛋。`;
		popup.style.display = 'flex';
		
		playable = false
	}
	
}

//提示信息框
function showNotification(){
	notification.classList.add('show');
	
	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000)
}


window.addEventListener('keydown', e => {
	if(playable){
		if(e.keyCode >= 65 && e.keyCode <= 90){
			let letter = e.key.toLowerCase();
			
			if(selectedWord.includes(letter)){//输入的字母正确
				if(!correctLetters.includes(letter)){	//第一次输入
					correctLetters.push(letter);
					
					displayWord()
				}else{	//已经输入过了
					showNotification()
				}
			}else{	//输入的字母错误
				if(!wrongLetters.includes(letter)){
					wrongLetters.push(letter);
					
					updateWrongLettersEl();
				}else{
					showNotification()
				}
			}
		}
	}
})

playAgainBtn.addEventListener('click', () => {
	playable = true;
	
	correctLetters.splice(0);
	wrongLetters.splice(0);
	
	selectedWord = words[Math.floor(Math.random() * words.length)];
	
	displayWord();
	updateWrongLettersEl();
	
	popup.style.display = 'none';
})

displayWord()