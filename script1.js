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
          resultHeading.innerHTML = `<p>결과가 없습니다. 다시 이용해 주세요.<p>`;
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
    alert('단어를 입력하세요.');
  }
}

// Event Listener
submit.addEventListener('submit',searchMeal )
random.addEventListener('click', getRandomMeal )
