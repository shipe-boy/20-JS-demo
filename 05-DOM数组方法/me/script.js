let main = document.getElementById('main');
let addUserBtn = document.getElementById('add-user');
let doubleBtn = document.getElementById('double');
let showMillionairesBtn = document.getElementById('show-millionaires');
let sortBtn = document.getElementById('sort');
let calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser()
getRandomUser()
getRandomUser()

//请求用户信息，接口返回随机的用户
async function getRandomUser(){
	let res = await fetch('https://randomuser.me/api')
	let data = await res.json();
	// console.log(data)
	
	let user = data.results[0]
	let userInfo = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	}
	addData(userInfo)
}

//数组中添加新用户信息，用于渲染DOM
function addData(userInfo){
	data.push(userInfo)
	
	updataDOM()
}

//更新DOM
function updataDOM(providedData = data){
	//清楚原有的再渲染
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
	
	/* providedData.forEach(item => {
		let element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML =  `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		main.appendChild(element)
	}) */
	
	//创建文档碎片
	let mainHtml = document.createDocumentFragment()
	providedData.forEach(item => {
		let element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML =  `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		mainHtml.appendChild(element)
	})
	main.appendChild(mainHtml)
}

//格式化价格，每三位一个逗号
function formatMoney(number){
	return '￥' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//用户的价格变成双倍
function doubleMoney(){
	// data = data.map(user => {
	// 	return {...user, money: user.money * 2}
	// })
	
	//直接forEach遍历
	data.forEach(user => {
		user.money = user.money *2
	})
	
	updataDOM()
}

//按从大到小排序
function sortByRichest(){
	data.sort((a, b) => b.money - a.money);
	
	updataDOM()
}

//只展示过来一百万的
function showMillionaires(){
	data = data.filter(user => user.money > 1000000);
	
	updataDOM()
}

//计算全部价格
function calculateWealth(){
	let wealth = data.reduce((acc, user) => (acc += user.money), 0);
	
	let wealthEl = document.createElement('div');
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	
	main.appendChild(wealthEl)
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)


