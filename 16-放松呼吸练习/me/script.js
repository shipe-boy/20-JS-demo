let container = document.getElementById('container');
let text = document.getElementById('text');

let totalTime = 7500;
let breatheTime = (totalTime / 5) * 2;
let holdTime = totalTime / 5


function breathAnimation(){
	text.innerText = 'Breathe In!';
	container.className = 'container grow';
	
	setTimeout(() => {
		text.innerText = 'Hold';
		
		setTimeout(() => {
			text.innerText = 'Breathe Out!';
			container.className = 'container shrink'
		}, holdTime)
	}, breatheTime)
}

breathAnimation()
setInterval(breathAnimation, totalTime);




