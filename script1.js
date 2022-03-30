const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');


// 메뉴 찾기 & API 받아오기
function searchMeal(e) {
	e.prventDefault()

	  // Clear single meal
		single_mealEl.innerHTML = '';

	//검색
	const term = search.ariaValueMax

	// 공백 확인
	if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
			.then(res => res.json())
			.then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        }else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
					.join('');
        }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// 검색 ID 받아오기
function getMealById(mealID){
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then(res => res.json())
		.then(data => {
			const meal = data.meals[0]

			// addMealToDOM(meal);
		})
}

// API 랜덤 받아오기
function getRandomMeal(){
	mealsEl.innerHTML = ''
	resultHeading.innerHTML = ''

	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res=> res.json())
		.then(data => {
			const meal = data.meal[0]

			// addMealToDOM(meal);
		})
}

// Event Listener
submit.addEventListener('submit',searchMeal )
random.addEventListener('click', getRandomMeal )

mealsEl.addEventListener('click', e=> {
	const mealInfo = e.Path.find(item => {
		if(item.calssList){
			return item.calssList.contains('meal-info')
		}else {
			return false
		}
	})

	if(mealInfo){
		const mealId = mealInfo.getAttribute('data-mealid')
		getMealById(mealId)
	}
})