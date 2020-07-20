let video = document.getElementById('video');
let play = document.getElementById('play');
let stop = document.getElementById('stop');
let progress = document.getElementById('progress');
let timestamp = document.getElementById('timestamp');

//video切换播放和暂停
function toggleVideoStatus(){
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
}

// 播放和暂停的图标切换
function updatePlayIcon(){
	if(video.paused){
		play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
	}else{
		play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
	}
}

//播放进度条
function updateProgress(){
	//播放进度百分比
	progress.value = (video.currentTime / video.duration) * 100;
	
	//获取分钟
	let mins = Math.floor(video.currentTime / 60);
	if(mins < 10){
		mins = '0' + mins;
	}
	
	//获取秒数
	let secs = Math.floor(video.currentTime % 60);
	if(secs < 10){
		secs = '0' + secs;
	}
	
	timestamp.innerHTML = `${mins}:${secs}`;
}


//拖动进度条
function setVideoProgress(){
	video.currentTime = (progress.value * video.duration) / 100;
}


//暂停按钮
function stopVideo(){
	video.currentTime = 0;
	video.pause();
}

video.addEventListener('click', toggleVideoStatus);

video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)

video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click',stopVideo);

progress.addEventListener('change', setVideoProgress)
