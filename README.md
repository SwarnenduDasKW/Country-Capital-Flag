## A simple ReactJS App

Show flags of all the countries of the world and their capital and currency too. You may wish to take a quiz if you like to test your knowledge

[Country Capital Flag - C3f](https://country-capital-flag.web.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

To build use
.\Country-Capital-Flag> npm run build

The code is deploed in Firebase

### `Firebase Deploy`

Install firebase-tools

> npm install -g firebase-tools

Connect to firebase console

> firebase login

Upon successful login

> firebase init

Follow the on-screen menu options for hosting the application in firebase.

Deploy the application to firebase

> firebase deploy

The url will be created.
[Country Capital Flag - C3f](https://country-capital-flag.web.app/)

## To do items

1. The quiz has hardcoded countries. Need to work with random data
2. Show the flag of the country in the quiz page
3. Implement scoring system - Done
4. The footer doesn't stay at the bottom when the country list becomes smaller (basically when you search for a country)
   The code to keep footer at the bottom is done for the quiz page but need a generic solution.
5. Don't like the white background - Done
6. The Navbar disappears on scrolling - It's not hapenning now.
7. Upon loading of the quiz page if user clicks of previous button the application crashes. - Disabled the previous button on the 1st question and the next button on the last question
8. Remember the previous answers so that user can see the chosen answers. - Done
9. Remove the "Check Answer" and Score. Replace that by Submit button. A report will popup showing user's selection and correct answer and score.
10. Code cleanup and organize the components properly
