let search = document.getElementById('search');
let submit = document.getElementById('submit');
let random = document.getElementById('random');
let mealsEl = document.getElementById('meals');
let resultHeading = document.getElementById('result-heading');
let single_mealEl = document.getElementById('single-meal');


function searchMeal(e){
	e.preventDefault();
	
	//重置展示区域
	single_mealEl.innerHTML = '';
	
	//获取查询的信息
	let term = search.value;
	
	if(term.trim()){
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
			.then(res => res.json())
			.then(data => {
				resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
				if(data.meals === null){
					resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
				}else{
					mealsEl.innerHTML = data.meals.map(meal => `
					<div class="meal">
					  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
					  <div class="meal-info" data-mealID="${meal.idMeal}">
					    <h3>${meal.strMeal}</h3>
					  </div>
					</div>
					`).join('');
				}
			});
		
		//清空搜索框文本
		search.value = ''
	}else{
		alert('Please enter a search term');
	}
}

//通过meal的id来查询
function getMealById(mealID){
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then(res => res.json())
		.then(data => {
			let meal = data.meals[0];
			
			addMealToDOM(meal)
		})
}

//随即查询
function getRandomMeal(){
	//重置内容区域
	mealsEl.innerHTML = '';
	resultHeading.innerHTML = '';
	
	fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
	  .then(res => res.json())
	  .then(data => {
	    let meal = data.meals[0];
	
	    addMealToDOM(meal);
	  });
}

//meald额详细信息
function addMealToDOM(meal){
	let ingredients = [];
	
	for(let i = 1; i <= 20; i++){
		if(meal[`strIngredient${i}`]){
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			)
		}else{
			break
		}
	}
	
	single_mealEl.innerHTML = `
		<div class="single-meal">
		  <h1>${meal.strMeal}</h1>
		  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
		  <div class="single-meal-info">
			${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
			${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
		  </div>
		  <div class="main">
			<p>${meal.strInstructions}</p>
			<h2>Ingredients</h2>
			<ul>
			  ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
			</ul>
		  </div>
		</div>
	`;
}

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
	let mealInfo = e.path.find(item => {
		if(item.classList){
			return item.classList.contains('meal-info');
		}else{
			return false;
		}
	})
	
	if(mealInfo){
		let mealID = mealInfo.getAttribute('data-mealid');
		getMealById(mealID)
	}
})







