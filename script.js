class Recipe {
    constructor(name, proteinPerServing, caloriesPerServing, costOfRecipe, url) {
        this.name = name;
        this.proteinPerServing = proteinPerServing;
        this.caloriesPerServing = caloriesPerServing;
        this.costOfRecipe = costOfRecipe;
        this.url = url;
    };
};

const recipes = [];

recipes.push(new Recipe("Potato Curry", 16,585,4.65, 'https://www.allrecipes.com/recipe/165190/spicy-vegan-potato-curry/'));
recipes.push(new Recipe("White Bean Soup", 25,475,3.20, 'https://www.budgetbytes.com/slow-cooker-white-bean-soup/'));
recipes.push(new Recipe("Red Lentil Stew",12,290,4.15, 'https://www.budgetbytes.com/vegan-red-lentil-stew/'));
recipes.push(new Recipe("Seitan Chicken",41,250,3.65, 'http://www.thatwasvegan.com/2012/01/30/my-favorite-chicken-style-seitan-recipe/'));
recipes.push(new Recipe("Mongolian Curls",14,315,5.2, 'https://www.vnutritionandwellness.com/mongolian-soy-curls/'));
recipes.push(new Recipe("Chicken Noodle Soup",10,190,5, 'https://thehiddenveggies.com/gluten-free-vegan-chicken-noodle-soup-tumeric/'));
recipes.push(new Recipe("Bean Lentil Chili",23,395,5.15, 'https://www.budgetbytes.com/slow-cooker-vegetarian-lentil-chili/'));
recipes.push(new Recipe("Chickpea Rice Soup",17,340,3.7, 'https://www.isachandra.com/2013/01/chickpea-rice-soup-with-a-little-kale/'));
recipes.push(new Recipe("Pasta Bake", 18,390,3.40, 'https://elavegan.com/vegan-pasta-bake-gluten-free-cheesy/'));
recipes.push(new Recipe("Kidney Beans and Rice", 19,440,6.40, 'https://www.acouplecooks.com/red-beans-and-rice/'));
recipes.push(new Recipe("Chickpea Cutlets", 26,500,3.9, 'http://www.isachandra.com/2010/11/doublebatch-chickpea-cutlets/'));
recipes.push(new Recipe("Moroccan Stew", 19,470,6.20, 'https://www.simplyhappyfoodie.com/instant-pot-moroccan-chickpea-stew/'));


function generateRecipe(recipeList) {
    const choice = Math.floor(Math.random() * recipeList.length);
    return recipeList[choice];
};

//console.log(generateRecipe(recipes));

function returnRecipes(weeklyBudget, proteinNeeds, calorieNeeds, numberOfMeals, recipeList) {
    /* Takes in the inputs from user and returns an array of dictionaries for the weekly
    meal plan, with no duplicates. */
    debugger;
    let recipeChoices = [];
    let costCount = 0;
    let proteinCount = 0;
    let calorieCount = 0;
    let numberOfMealsCount = numberOfMeals;
    let foundRecipes = [];

    while (numberOfMealsCount > 0) {
        let nextRecipe = generateRecipe(recipeList);
        let found = false;
        for (let i = 0; i < foundRecipes.length; i++) {
            if (nextRecipe.name == foundRecipes[i].name) {
                found = true;
            }; 
        };
        if (found === false) {
            if (calorieCount + nextRecipe.caloriesPerServing <= calorieNeeds && costCount + nextRecipe.costOfRecipe <= weeklyBudget) {
                recipeChoices.push(nextRecipe);
                numberOfMealsCount -= 1;
                costCount += nextRecipe.costOfRecipe;
                proteinCount += nextRecipe.proteinPerServing;
                calorieCount += nextRecipe.caloriesPerServing;
                foundRecipes.push(nextRecipe);
            };
        };
        if (numberOfMealsCount === 0 && proteinNeeds - proteinCount > 5) {
            recipeChoices = [];
            costCount = 0;
            proteinCount = 0;
            calorieCount = 0;
            numberOfMealsCount = numberOfMeals;
            foundRecipes = [];
        };
    };

    const returnTotals = {
        'totalDailyProtein': proteinCount,
        'totalDailyCalories': calorieCount,
        'totalCost': "$" + costCount.toFixed(2)
    };

    return [recipeChoices, returnTotals];
};
// TAKES DATA INPUT FROM FORM AND USES IT IN returnRecipes() function

console.log(returnRecipes(40, 40, 1000, 2, recipes));


// DYNAMICALLY CREATE TABLE FROM RECIPE OUTPUTS
function createTable() {
    const recipeChoicesAndTotals = returnRecipes(40, 40, 1000, 2, recipes);
    const recipeChoices = recipeChoicesAndTotals[0];
    const recipeTotals =recipeChoicesAndTotals[1];
    
    const table = document.createElement('table');

    table.setAttribute('id', 'empTable');

    let arrHead = new Array();
    arrHead = ['Recipe name', 'Protein per Serving', 'Calories per Serving', 'Cost per Recipe', 'URL'];

    let arrValue = new Array();
    for (let i = 0; i < recipeChoices.length; i++) {
        arrValue.push([recipeChoices[i].name, recipeChoices[i].proteinPerServing, recipeChoices[i].caloriesPerServing, recipeChoices[i].costOfRecipe, recipeChoices.url]);
    };
    arrValue.push(['TOTALS', recipeTotals.totalDailyProtein, recipeTotals.totalDailyCalories, recipeTotals.totalCost, '']);
   
    let tr = table.insertRow(-1);

    // Creates Header Row By looping through arrHead and creating header cells and changing innerHTML to be that value
    for (let h = 0; h < arrHead.length; h++) {
        let th = document.createElement('th');
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    };

    for (let c = 0; c < arrValue.length; c++) {
        tr = table.insertRow(-1);

        for (let j = 0; j < arrHead.length; j++) {
            let td = document.createElement('td');
            td = tr.insertCell(-1);
            td.innerHTML = arrValue[c][j];
        };
    };



    let button = document.createElement('button');
    let bText = document.createTextNode('Submit');
    button.appendChild(bText);

    button.setAttribute('onclick', 'getTableValues()')

    document.body.appendChild(table);
    document.body.appendChild(button);

};
createTable();


function getTableValues() {
    const empTable = document.getElementById('empTable');

    // CREATE DIV WHERE TABLE WILL BE SHOWN
    let tableDiv = document.createElement('div');
    tableDiv.innerHTML = '';
    tableDiv.innerHTML = '<br />';

    // TRANSVERES THROUGH THE TABLE TO EXTRACT CELL VALUES
    for (let r = 1; r <= empTable.rows.length - 1; r++) {
        // ADD DATE TO THE TABLE DIV
        tableDiv.innerHTML = tableDiv.innerHTML + ' ' 
            + emptTable.rows[r].cells[c].innerHTML;
    };
    tableDiv.innerHTML = tableDiv.innerHTML + '<br />';

    document.body.appendChild(tableDiv); // APPEND CONTAINER TO THE BODY

};

// A comment to figure out git
