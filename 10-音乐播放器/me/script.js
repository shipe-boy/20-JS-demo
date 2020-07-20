let musicContainer = document.getElementById('music-container');
let playBtn = document.getElementById('play');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');

let audio = document.getElementById('audio');
let progress = document.getElementById('progress');
let progressContainer = document.getElementById('progress-container');
let title = document.getElementById('title');
let cover = document.getElementById('cover');

//歌曲名称
let songs = ['hey', 'summer', 'ukulele'];

//当前歌曲下标
let songIndex = 2;

loadSong(songs[songIndex]);

//加载播放歌曲
function loadSong(song){
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

//播放歌曲
function playSong(){
	musicContainer.classList.add('play');
	
	playBtn.querySelector('i.fas').classList.remove('fa-play')
	playBtn.querySelector('i.fas').classList.add('fa-pause')
	
	audio.play()
}
//暂停播放
function pauseSong(){
	musicContainer.classList.remove('play');
	
	playBtn.querySelector('i.fas').classList.add('fa-play')
	playBtn.querySelector('i.fas').classList.remove('fa-pause')
	
	audio.pause()
}

//上一首歌曲
function prevSong(){
	songIndex--;
	
	if(songIndex < 0){
		songIndex = songs.length - 1
	}
	loadSong(songs[songIndex])
	playSong()
}
//下一首歌曲
function nextSong(){
	songIndex++;
	
	if(songIndex > songs.length - 1){
		songIndex = 0
	}
	loadSong(songs[songIndex])
	playSong()
}


//更新播放进度
function updateProgress(e){
	let {duration, currentTime} = e.srcElement;
	let progressPercent = (currentTime / duration) * 100
	progress.style.width = `${progressPercent}%`;
}
//点击进度条
function setProgress(e){
	let width = this.clientWidth;
	let clickX = e.offsetX;
	let duration = audio.duration;
	
	audio.currentTime = (clickX / width) * duration;
}


playBtn.addEventListener('click', () => {
	let isPlaying = musicContainer.classList.contains('play');
	
	if(isPlaying){
		pauseSong()
	}else{
		playSong()
	}
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)










