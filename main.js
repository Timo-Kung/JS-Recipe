const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('container');
let searchQuery = ' ';
const APP_ID = '11455fa8';
const APP_Key = '052096141adbd3b40e8d6a4e6a5ab776';


searchForm.addEventListener('submit', (e) => {  /*addEventListener: 添加事件監聽器*/
    e.preventDefault(); /*取消DOM預設功能*/
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits)
    console.log(data);
}

function generateHTML(results) {
    // container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}">View Recipe</a>
        </div>
        <p class="item-data">Clories : ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Labels : ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels.length : 'No Data Found'}</p>
        <p class="item-data">MealType : ${result.recipe.mealType}</p>
        </div>
        `

    })
    searchResultDiv.innerHTML = generatedHTML;
}