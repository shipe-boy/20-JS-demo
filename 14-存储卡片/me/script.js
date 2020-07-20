let cardsContainer = document.getElementById('cards-container');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let currentEl = document.getElementById('current');
let shoeBtn = document.getElementById('show');
let hideBtn = document.getElementById('hide');
let questionEl = document.getElementById('question');
let answerEl = document.getElementById('answer');
let addCardBtn = document.getElementById('add-card');
let clearBtn = document.getElementById('clear');
let addContainer = document.getElementById('add-container');

let currentActiveCard = 0;

let cardsEl = [];

let cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   }
// ];

function getCardsData(){
	let cards = JSON.parse(localStorage.getItem('cards'));
	
	return cards === null ? [] : cards;
}

function createCards(){
	cardsData.forEach(createCard)
}
function createCard(data, index){
	let card = document.createElement('div');
	card.classList.add('card');
	
	if(index === 0){
		card.classList.add('active');
	}
	
	card.innerHTML = `
	<div class="inner-card">
	  <div class="inner-card-front">
	    <p>
	      ${data.question}
	    </p>
	  </div>
	  <div class="inner-card-back">
	    <p>
	      ${data.answer}
	    </p>
	  </div>
	</div>
	`;
	
	card.addEventListener('click', () => {
		card.classList.toggle('show-answer')
	})
	
	cardsEl.push(card);
	
	cardsContainer.appendChild(card)
	
	updateCurrentText()
}

//更新页码下表
function updateCurrentText(){
	currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

//设置
function setCardsData(cards){
	localStorage.setItem('cards', JSON.stringify(cards));
	window.location.reload();
}

createCards()

nextBtn.addEventListener('click', () => {
	if(cardsEl.length === 0) return
	cardsEl[currentActiveCard].className = 'card left';
	
	currentActiveCard = currentActiveCard + 1;
	if(currentActiveCard > cardsEl.length - 1){
		currentActiveCard = cardsEl.length - 1
	}
	
	cardsEl[currentActiveCard].className = 'card active';
	
	updateCurrentText()
})

prevBtn.addEventListener('click', () => {
	if(cardsEl.length === 0) return
	cardsEl[currentActiveCard].className = 'card right';
	
	currentActiveCard = currentActiveCard - 1;
	if(currentActiveCard < 0){
		currentActiveCard = 0
	}
	
	cardsEl[currentActiveCard].className = 'card active';
	
	updateCurrentText()
})

shoeBtn.addEventListener('click', () => {
	addContainer.classList.add('show')
})
hideBtn.addEventListener('click', () => {
	addContainer.className.remove('show')
})

addCardBtn.addEventListener('click', () => {
	let question = questionEl.value;
	let answer = answerEl.value;
	
	if(question.trim() && answer.trim()){
		let newCard = {question, answer};
		
		createCard(newCard);
		
		questionEl.value = '';
		answerEl.value = '';
		
		addContainer.classList.remove('show');
		
		cardsData.push(newCard);
		setCardsData(cardsData);
	}
})


clearBtn.addEventListener('click', () => {
	localStorage.clear();
	cardsContainer.innerHTML = '';
	window.location.reload();
})

