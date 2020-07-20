let draggable_list = document.getElementById('draggable-list');
let check = document.getElementById('check');

let richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

let listItems = [];

let dragStartIndex;
createList()
function createList(){
	[...richestPeople]
		.map(a => ({value: a, sort: Math.random()}))
		.sort((a, b) => a.sort - b.sort)
		.map(a => a.value)
		.forEach((person, index) => {
			let listItem = document.createElement('li');
			
			listItem.setAttribute('data-index', index);
			
			listItem.innerHTML = `
			<span class="number">${index + 1}</span>
			<div class="draggable" draggable="true">
			  <p class="person-name">${person}</p>
			  <i class="fas fa-grip-lines"></i>
			</div>
			`;
			
			listItems.push(listItem);
			
			draggable_list.appendChild(listItem);
		})
		
	//监听事件
	addEventListeners()
}
//dragstart：网页元素开始拖动时触发。drag：被拖动的元素在拖动过程中持续触发。
function dragStart(){
	// Element.closest() 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
	dragStartIndex = +this.closest('li').getAttribute('data-index');
}

//dragenter：被拖动的元素进入目标元素时触发，应在目标元素监听该事件。
function dragEnter(){
	this.classList.add('over');
}
//dragleave：被拖动的元素离开目标元素时触发，应在目标元素监听该事件
function dragLeave(){
	this.classList.remove('over');
}
//dragover：被拖动元素停留在目标元素之中时持续触发，应在目标元素监听该事件
function dragOver(e){
	e.preventDefault();
}
//drap：被拖动元素或从文件系统选中的文件，拖放落下时触发。
function dragDrop(){
	let dragEndIndex = +this.getAttribute('data-index');
	swapItems(dragStartIndex, dragEndIndex)
	
	this.classList.remove('over');
}


//利用appendChild剪切，来交换元素
function swapItems(fromIndex, toIndex){
	let itemOne = listItems[fromIndex].querySelector('.draggable');
	let itemTwo = listItems[toIndex].querySelector('.draggable');
	
	
	listItems[fromIndex].appendChild(itemTwo);
	listItems[toIndex].appendChild(itemOne);
}


//检查是否正确
function checkOrder(){
	listItems.forEach((listItem, index) => {
		let personName = listItem.querySelector('.draggable').innerText.trim();
		
		if(personName !== richestPeople[index]){
			listItem.classList.add('wrong');
		}else{
			listItem.classList.remove('wrong');
			listItem.classList.add('right')
		}
	})
}


function addEventListeners(){
	let draggables = document.querySelectorAll('.draggable');
	let dragListItems = document.querySelectorAll('.draggable-list li');
	
	draggables.forEach(draggable => {
		draggable.addEventListener('dragstart', dragStart)
	})
	
	dragListItems.forEach(item => {
		item.addEventListener('dragover', dragOver);
		item.addEventListener('drop', dragDrop);
		item.addEventListener('dragenter', dragEnter);
		item.addEventListener('dragleave', dragLeave);
	})
}

check.addEventListener('click', checkOrder)










