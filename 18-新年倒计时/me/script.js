let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let countdown = document.getElementById('countdown');
let year = document.getElementById('year');
let loading = document.getElementById('loading');

let currentYear = new Date().getFullYear();
let newYearTime = new Date(`${currentYear + 1}-01-01 00:00:00`);

year.innerText = currentYear + 1;

function updateCounrdown(){
	let currentTime = new Date();
	let diff = newYearTime - currentTime;
	
	let d = Math.floor(diff / 1000 / 60 / 60 / 24);	//天
	let h = Math.floor(diff / 1000 / 60 / 60) % 24; //小时
	let m = Math.floor(diff / 1000 / 60) % 60;//分钟
	let s = Math.floor(diff / 1000) % 60;//秒
	
	days.innerHTML = d;
	hours.innerHTML = h < 10 ? '0' + h : h;
	minutes.innerHTML = m < 10 ? '0' + m : m;
	seconds.innerHTML = s < 10 ? '0' + s : s;
	
}
//加载动画
setTimeout(() => {
	loading.remove();
	countdown.style.display = 'flex';
}, 1000)

setInterval(updateCounrdown, 1000)











