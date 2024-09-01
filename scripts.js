document.getElementById('track-button').addEventListener('click', function() {
    const food = document.getElementById('food-search').value;
    fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${food}&app_id=your_app_id&app_key=your_app_key`)
    .then(response => response.json())
    .then(data => {
        const nutrients = data.hints[0].food.nutrients;
        document.getElementById('nutrition-results').innerHTML = `
            <p>Calories: ${nutrients.ENERC_KCAL || 'N/A'} kcal</p>
            <p>Protein: ${nutrients.PROCNT || 'N/A'} g</p>
            <p>Fat: ${nutrients.FAT || 'N/A'} g</p>
            <p>Carbohydrates: ${nutrients.CHOCDF || 'N/A'} g</p>
        `;
    })
    .catch(error => {
        document.getElementById('nutrition-results').innerHTML = 'Error fetching data. Please try again.';
        console.error('Error:', error);
    });
});


document.getElementById('calculate-bmi').addEventListener('click', function() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    if (height && weight) {
        const bmi = (weight / (height * height)).toFixed(2);
        let result = `Your BMI is ${bmi}. `;
        if (bmi < 18.5) result += 'You are underweight.';
        else if (bmi < 24.9) result += 'You are normal weight.';
        else if (bmi < 29.9) result += 'You are overweight.';
        else result += 'You are obese.';
        document.getElementById('bmi-result').innerText = result;
    } else {
        document.getElementById('bmi-result').innerText = 'Please enter valid height and weight.';
    }
});

// Variables to store total calories for each meal
let totalCalories = {
    breakfast: 0,
    lunch: 0,
    dinner: 0
};

// Function to handle the tracking for each meal
function trackCalories(mealType) {
    // Get the selected food and corresponding list and result elements
    let searchInput = document.getElementById(`${mealType}-search`);
    let selectedFood = searchInput.value;
    let options = document.querySelectorAll(`#${mealType}-options option`);
    let resultDiv = document.getElementById(`${mealType}-results`);

    // Variable to store the calorie value
    let calorieValue = null;

    // Loop through the options to find the matching food and its calories
    options.forEach(option => {
        if (option.value === selectedFood) {
            // Get the calorie value from the data attribute
            calorieValue = parseInt(option.getAttribute('data-calories'));
        }
    });

    // Display the result and update the total calories
    if (calorieValue) {
        totalCalories[mealType] += calorieValue; // Update total calories for the meal
        resultDiv.innerHTML = `The calorie content of ${selectedFood} is ${calorieValue} kcal.`;
    } else {
        resultDiv.innerHTML = `No calorie information available for ${selectedFood}.`;
    }

    // Update the total calorie count
    updateTotalCalories();
}

// Function to update the total calories display
function updateTotalCalories() {
    let total = totalCalories.breakfast + totalCalories.lunch + totalCalories.dinner;
    document.getElementById('total-calories').innerText = `Total: ${total} kcal`;
}

// Add event listeners to track buttons for breakfast, lunch, and dinner
document.getElementById('breakfast-track-button').addEventListener('click', function() {
    trackCalories('breakfast');
});

document.getElementById('lunch-track-button').addEventListener('click', function() {
    trackCalories('lunch');
});

document.getElementById('dinner-track-button').addEventListener('click', function() {
    trackCalories('dinner');
});

//making the navbar sticky

window.onscroll = function() {
    var header = document.querySelector("header");
    if (window.pageYOffset> 0) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
};


//Making the navbar active on scroll

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset= sec.offsetTop;
        let height= sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top >= offset && top < offset+ height){
        navLinks.forEach(links =>{
            links.classList.remove('active');
            document.querySelector('header nav a[href*=' + id +'] ').classList.add('active');
        })
        }
    })
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}

function calc()
{ 
    var height=parseFloat(document.getElementById('height').value);
    var weight=parseFloat(document.getElementById('weight').value);

// Calculate BMI
    var bmi = weight / (height * height);

    // Display the result
    var resultText = 'Your BMI is ' + bmi.toFixed(2) + '.';
    // Determine BMI category
    if (bmi < 18.5) {
        resultText += ' You are underweight.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultText += ' You have a normal weight.';
    } else if (bmi >= 25 && bmi < 29.9) {
        resultText += ' You are overweight.';
    } else {
        resultText += ' You are obese.';
    }

    document.getElementById('bmi-result').innerText = resultText;
}

