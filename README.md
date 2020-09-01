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

## Git commands

- git init
- git add .
- git commit -m "first commit"
- git remote add origin https://github.com/SwarnenduDasKW/Country-Capital-Flag.git
- git push -u origin master

## To do items

- [ ] The Navbar disappears on scrolling - It's not hapenning now. This happens when the application is left open on localhost for long hours. Maybe because of network connection drop.
- [ ] When the countries are loading show "Loading..." not "No data found"
- [ ] Set the timer when a user start the quiz
- [x] Change the opacity of the previous and next buttons when they reach beginning or end of the question set
- [ ] Once the report is closed take the user back to the Quiz level page

## Defects

- [x] Faulty scoring system.
- [x] In the country capital quiz duplicate answer is shown. This is because Country Niue and Jamica have the same capital name Kingston.

## Done

1. Done - The quiz has hardcoded countries. Need to work with random data.
2. Done - Show the flag of the country in the quiz page.
3. Done - Implement scoring system.
4. Done - The footer doesn't stay at the bottom when the country list becomes smaller (basically when you search for a country). The code to keep footer at the bottom is done for the quiz page but need a generic solution.
5. Done - Don't like the white background.
6. Done - Upon loading of the quiz page if user clicks of previous button the application crashes.
   Disabled the previous button on the 1st question and the next button on the last question
7. Done - Remember the previous choise so that user can see the chosen answers.
8. Done - Code cleanup and organize the components properly.
9. Done - Implement 3 difficulty levels for the quiz. Easy - Medium - Hard
10. Done - Remove the "Check Answer" and Score. Replace that by Submit button. A report will popup showing user's selection and correct answer and score.
