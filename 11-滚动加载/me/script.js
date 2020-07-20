let postsContainer = document.getElementById('posts-container');
let loading = document.querySelector('.loader');
let filter = document.getElementById('filter');

let limit = 5;
let page = 1;

//请求数据
async function getPosts(){
	let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
	let data = await res.json()
		
	return data
}

//渲染数据
async function showPosts(){
	let posts = await getPosts();
	
	let postsHtml = document.createDocumentFragment();
	posts.forEach(post => {
		let postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = `
			<div class="number">${post.id}</div>
			<div class="post-info">
			  <h2 class="post-title">${post.title}</h2>
			  <p class="post-body">${post.body}</p>
			</div>
		`;
		postsHtml.appendChild(postEl)
	})
	
	postsContainer.appendChild(postsHtml)
}


//加载数据
function showLoading(){
	loading.classList.add('show');
	
	setTimeout(() => {
		loading.classList.remove('show')
		
		setTimeout(() => {
			page++;
			showPosts()
		}, 300)
		
	}, 1000)
}

function filterPosts(e){
	let term = e.target.value.toUpperCase();
	let posts = document.querySelectorAll('.post');
	
	posts.forEach(post => {
		let title = post.querySelector('.post-title').innerHTML.toUpperCase();
		let body = document.querySelector('.post-body').innerHTML.toUpperCase();
		
		if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
			post.style.display = 'flex';
		}else{
			post.style.display = 'none';
		}
		
	})
}

//初始化数据
showPosts()

window.addEventListener('scroll', () => {
	let {scrollTop, scrollHeight, clientHeight} = document.documentElement;
	
	if(scrollTop + clientHeight >= scrollHeight - 5){
		showLoading()
	}
})

filter.addEventListener('input', filterPosts)




