let form = document.getElementById('form');
let search = document.getElementById('search');
let result = document.getElementById('result');
let more = document.getElementById('more');

let apiURL = 'https://api.lyrics.ovh';


//请求数据
async function searchSongs(term){
	let res = await fetch(`${apiURL}/suggest/${term}`);
	let data = await res.json();
	
	showData(data)
}

//展示数据
function showData(data){
	console.log(data.data)
	result.innerHTML = `
	<ul class="songs">
	  ${data.data
	    .map(
	      song => `<li>
	  <span><strong>${song.artist.name}</strong> - ${song.title}</span>
	  <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
	</li>`
	    )
	    .join('')}
	</ul>
	`;
	
	//分页
	if(data.prev || data.next){
		more.innerHTML = `
		${
		  data.prev
		    ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
		    : ''
		}
		${
		  data.next
		    ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
		    : ''
		}
		`
	}else{
		more.innerHTML = '';
	}
}
//分页数据请求
async function getMoreSongs(url){
	let res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
	let data = await res.json();
	
	showData(data)
}


//获取歌曲歌词
async function getLyrics(artist, songTitle){
	let res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
	let data = await res.json();
	
	if(data.error){
		result.innerHTML = data.error;
	}else{
		let lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
		
		result.innerHTML = `
		<h2><strong>${artist}</strong> - ${songTitle}</h2>
		<span>${lyrics}</span>
		`;
	}
	
	more.innerHTML = '';
	
}


//
form.addEventListener('submit', e => {
	e.preventDefault();
	
	let searchTerm = search.value.trim();
	
	if(!searchTerm){
		alert("没内容，你点啥？")
	}else{
		searchSongs(searchTerm)
	}
})

result.addEventListener('click', e => {
	let clickedEl = e.target;
	
	if(clickedEl.tagName === 'BUTTON'){
		let artist = clickedEl.getAttribute('data-artist')
		let songTitle = clickedEl.getAttribute('data-songtitle');
		
		
		getLyrics(artist, songTitle)
	}
})








