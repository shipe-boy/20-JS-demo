let balance = document.getElementById('balance');
let money_plus = document.getElementById('money-plus');
let money_minus = document.getElementById('money-minus');
let list = document.getElementById('list');
let form = document.getElementById('form');
let text = document.getElementById('text');
let amount = document.getElementById('amount');

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


function addTransaction(e){
	e.preventDefault();
	
	if(text.value.trim() === '' || amount.value.trim() === ""){
		alert("输内容啊！瞎点啥。")
	}else{
		let transaction = {
			id: generateID(),
			text: text.value,
			amount: +amount.value
		};
		
		transactions.push(transaction);
		
		addTransactionDOM(transaction);
		
		updateValues();
		
		updateLocalStorage();
		
		text.value = '';
		amount.value = '';
	}
}

//随机生成ID
function generateID(){
	return Math.floor(Math.random() * 100000000)
}

//添加交易
function addTransactionDOM(transaction){
	//支出还是收入
	let sign = transaction.amount < 0 ? '-' : '+';
	
	//创建dom
	let item = document.createElement('li');
	item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
	item.innerHTML = `
	${transaction.text} <span>${sign}${Math.abs(
	  transaction.amount
	)}</span> <button class="delete-btn" onclick="removeTransaction(${
	  transaction.id
	})">x</button>
	`
	
	list.appendChild(item)
}

//更新金额
function updateValues(){
	let amounts = transactions.map(transaction => transaction.amount);
	
	//总收支
	let total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
	
	//收入
	let income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2)
	//支出
	let expense = (
		amounts
			.filter(item => item < 0)
			.reduce((acc, item) => (acc += item), 0)
			* -1
	).toFixed(2)
	
	balance.innerText = `$${total}`;
	money_plus.innerText = `$${income}`;
	money_minus.innerText = `$${expense}`;
}

//移除某一项
function removeTransaction(id){
	transactions = transactions.filter(transaction => transaction.id !== id)
	
	updateLocalStorage();
	
	init()
}

//更新
function updateLocalStorage(){
	localStorage.setItem('transactions', JSON.stringify(transactions))
}

//初始化
function init(){
	list.innerHTML = ''
	
	transactions.forEach(addTransactionDOM);
	updateValues()
}

init()

form.addEventListener('submit', addTransaction)











