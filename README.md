# Cuinare

This project was created using [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template. Permanece of user information is achived using Real Time Database from Firebase, and session information is stored in Session Storage, avoiding loosing the information when refreshing the page.

## Context

This project was created by me (Joan Montiel) as a part of my studies at ISDI Coders Frontend Dev bootcamp. The main purpose of this web application is to allow me to practice most of the content covered during the bootcamp. Although, this project is not conceived to result in a final product it is developed to include most of the necessary features to be a final product. The work is still in progress, and I plan to keep adding new features and improvements for as long as I can.

The app uses the public API *https://www.themealdb.com/*. Some features such as the multiingredient filters require to become a Paypal supporter. But, many methods are included using the developer test key '1' as the API key.

## App description

### `name`

The word **cuinare** is the result of combining two other words: 1) **cuina**, the catalan (valencian) word for kitchen and 2) **recipe**, including only its first two letters.

### `features`

The web app currently includes five main features:

1. Home
2. Recipes
3. My Fridge
4. My Recipes
5. Favorites

#### Home

The Home page welcomes you with a nice picture, an inspiring piece of text and a list of the last recipes added to the API used.

#### Recipes

The Recipes page gives access to all recipes provided by the API classified by **categories**. Recipes details are selected when clicking on the recipe name, category or origin.

#### My Fridge

My Fridge allows to search recipes that contain a given list of ingredients. This feature includes the searching form, a text box containing the list of ingredients selected, the complete list of ingredients and the list of recipes. The user can search for the desired ingredient, while the list of ingredients only shows the ingredients which includes the characters written in the input. For adding ingredients to the list of selected ingredients the user can click on the ingredient or in the case that a single ingredient is left, can press the Enter button from the keyboard.
Each element on the list of selected ingredients can be deleted from the list by clicking on the delete button. The list of recipes will show only the list of recipes with the selected ingredients.

#### My Recipes

In this feature the user must login to be able to enter its own recipes. The recipes will be listed below. The user can select or not its recipes as a favorites.

#### Favorites

Shows the list of favorite recipes.

#### Login

Login authentication is provided by Firebase authentication tool.
