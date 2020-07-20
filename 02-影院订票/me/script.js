let container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');
let count = document.getElementById('count');
let total = document.getElementById('total');
let movieSelect = document.getElementById('movie');


populateUI()

let ticketPrice = movieSelect.value;

// 保存选择的电影价格和
function setMovieData(movieIndex, moviePrice){
	localStorage.setItem('selectedMovieIndex', movieIndex)
	localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateSelectedCount(){
	let selectedSeats = document.querySelectorAll('.row .seat.selected');
	
	let seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
	
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
	
	//计算总数和价格
	let selectedSeatsCount = selectedSeats.length
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}


//初始化
function populateUI(){
	let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	
	if(selectedSeats !== null && selectedSeats.length > 0){
		// seats.forEach((seat, index) => {
		// 	if(selectedSeats.indexOf(index) > -1) {
		// 		seat.classList.add('selected');
		// 	}
		// })
		selectedSeats.forEach((seatIndex) => {
			seats[seatIndex].classList.add('selected');
		})
	}
	
	let selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if(selectedMovieIndex !== null){
		movieSelect.selectedIndex = selectedMovieIndex
	}
	
}


//选择电影
movieSelect.addEventListener('change', e => {
	ticketPrice = e.target.value;
	// console.dir(e.target.selectedIndex)  select选择的下标
	setMovieData(e.target.selectedIndex, e.target.value)
	updateSelectedCount();
})

//选择座位
container.addEventListener('click', e => {
	if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected')
		
		updateSelectedCount();
	}
})

updateSelectedCount()