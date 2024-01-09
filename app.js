let dish = document.getElementById("frontDish");
let images = document.getElementById("images");
let heading = document.getElementById("heading");
let img = document.getElementById("Img");
let ingre = document.getElementById("Ingre");

function fetchRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => displayRandomMeal(data))
        .catch(error => console.log(error));
}
function displayRandomMeal(mealData) {
    dish.innerHTML = " "

    const mealName = document.createElement('h2');
    mealName.textContent = mealData.meals[0].strMeal;

    const mealImage = document.createElement('img');
    mealImage.src = mealData.meals[0].strMealThumb;
    dish.appendChild(mealImage);
    dish.appendChild(mealName);

    dish.addEventListener('click', () => openModal(mealData.meals[0]));
}
fetchRandomMeal();

function openModal(meal) {
    heading.textContent = meal.strMeal;
    img.src = meal.strMealThumb;
    ingre.innerHTML = " ";

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient},`;
            ingre.appendChild(listItem);
        }
    }

    displayModalContent(meal);
    images.style.display = "block";
}

function displayModalContent(meal) {
    console.log(`Meal Name: ${meal.strMeal}`);
}

 closeModal = document.getElementById("closeBtn");
closeModal.addEventListener('click', () => {
    images.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === images) {
        images.style.display = "none";
    }
});

searchBox = document.getElementById("category");
searchBox.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        location.href = "#category";
        fetchMealsByCategory();
    }
});
function fetchMealsByCategory() {
    const category = searchBox.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(res => displayMeals(res))
        .catch(error => console.log(error));
}

const category = document.getElementById("category");
const result = document.getElementById("result");

function displayMeals(results) {

    if (results.meals) {
        results.meals.forEach(meal => {
            mealDiv = document.createElement('div');
            mealDiv.setAttribute("class", "mealDivBox");
            mealName = document.createElement('h3');
            mealName.textContent = meal.strMeal;
            mealImage = document.createElement('img');
            mealImage.src = meal.strMealThumb;
            mealDiv.appendChild(mealImage);
            mealDiv.appendChild(mealName);
            result.appendChild(mealDiv);

            category.innerHTML = `Meals for ${searchBox.value}`;
        });
    } else {
        const error = document.createElement('p');
        error.innerText = 'We are sorry... to say that..we not have that item..🙂!!';
        result.appendChild(error);
    }
}


