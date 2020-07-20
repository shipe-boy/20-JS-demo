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

let correctLetters = [];//������ȷ����ĸ
let wrongLetters = [];//����������ĸ

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
		finalMessage.innerText = "��ϲ�㣬�ɹ�ͨ����"
		popup.style.display = 'flex';
		
		playable = false;
	}
}

//���´������ĸ
function updateWrongLettersEl(){
	//չʾ�������ĸ
	wrongLettersEl.innerHTML = `
	${wrongLetters.length > 0  ? '<p>Wrong</p>' : ''}
	${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;
	
	//չʾС��
	figureParts.forEach((part, index) => {
		let errors = wrongLetters.length;
		
		if(index < errors){
			part.style.display = 'block';
		}else{
			part.style.display = 'none';
		}
	})
	
	if(wrongLetters.length === figureParts.length){
		finalMessage.innerText = "�����㻹�����ˣ�����";
		finalMessageRevealWord.innerText = `�����ǣ�${selectedWord}��������`;
		popup.style.display = 'flex';
		
		playable = false
	}
	
}

//��ʾ��Ϣ��
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
			
			if(selectedWord.includes(letter)){//�������ĸ��ȷ
				if(!correctLetters.includes(letter)){	//��һ������
					correctLetters.push(letter);
					
					displayWord()
				}else{	//�Ѿ��������
					showNotification()
				}
			}else{	//�������ĸ����
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