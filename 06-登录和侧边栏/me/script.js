let toggle = document.getElementById('toggle');
let close = document.getElementById('close');
let open = document.getElementById('open');
let model = document.getElementById('modal');
let navbar = document.getElementById('navbar');

//侧边栏
function closeNavbar(e){
	if(
		document.body.classList.contains('show-nav') &&
		e.target !== toggle &&
		!toggle.contains(e.target) &&
		e.target !== navbar &&
		!navbar.contains(e.target)
	){
		document.body.classList.toggle('show-nav');
		document.body.removeEventListener('click', closeNavbar)
	}else if(!document.body.classList.contains('show-nav')){
		document.body.removeEventListener('click', closeNavbar);
	}
}

toggle.addEventListener('click', () =>{
	document.body.classList.toggle('show-nav');
	document.body.addEventListener('click', closeNavbar)
})


//登录框
open.addEventListener('click', () => {
	model.classList.add('show-modal')
})
close.addEventListener('click', () => {
	model.classList.remove('show-modal')
})

window.addEventListener('click', e => {
	e.target == model ? model.classList.remove('show-modal') : false
})



























