'use-strict'
//array of question objects to loop through.
let questions = [];
//variable to track quote index
let i = 0;
//variable to track question question_number
let questionNumber = 1;
//variable to track Score
let score = 0;
//object prototype for questions & answers
let answer='';

function Question(quote, author) {
  this.quote = quote;
  this.author = author;
  this.questionPush();
};

//method to push question objects into questions array
Question.prototype.questionPush = function () {
  questions.push(this);
};

//create questions
const hemingway1 = new Question('The sun came out. It was warm and pleasant.', 'Hemingway');
const mom1 = new Question('We had a couple of beautiful days this week. Tuesday was one of them.','Mother');
const mom2 = new Question('We went out for breakfast because we had nothing to eat for breakfast.','Mother');
const hemingway2 = new Question('I figured the butter would be good for him.', 'Hemingway');
const mom3 = new Question('I imagine that you are still sleeping at this moment safe in your own bed.','Mother');
const mom4 = new Question('Things went smoothly and we saw a lot of beautiful scenery.','Mother');
const hemingway3 = new Question('Then there was the bad weather.','Hemingway');
const mom5 = new Question('You said that you would understand if I declined, but I am trusting that you do understand, and I thank you for your understanding.','Mother');

//check to make sure questions array was populated
console.log(questions);

//start game
function startGame(){
  $('.start-game').on('click', function(event) {
    //hide other sections (.start)
    $(this).closest('section').toggleClass('hide');
    //display form
    askQuestion();
  });
};

//function to clear radio buttons
function clearCheckboxes() {
  $('input[name=answer]').prop('checked', false);
};

//function to write new quote
function displayQuote(){
  clearCheckboxes();
  $('.quote').append(`<p>${questions[i].quote}</p>`);
  renderScore();
  writeQuestionNumber();
};

//function to write question
function writeQuestionNumber() {
  $('.question_number').append(`<p>Question number: ${questionNumber} of 8</p>`)
};

//ask question logic
function askQuestion(){
  if (i === 0) {
    //on the first load, display main
  show('main');
  //remove any children elements from the quote section
  removeChildElements('.quote');
  //remove any children elements from the question number section
  removeChildElements('.question_number');
  //write the quote to the screen
  displayQuote();
  }
  //after the last quote is displayed
  else if (i === questions.length){
    //reveal the final score section
    show('.final');
    //hide main section
    hide('main');
    //show final score
    renderScore();
    resetGame();
    startGame();
  }
  //if it's not the first or the last question, display the quote
  else {
  displayQuote();
  }
};

//function to hide an html element
function hide(param){
  $(param).addClass('hide');
};

//function to show an html element
function show(param){
  $(param).removeClass('hide');
};

//reset all variables in case they want to play again
function resetGame(){
  i = 0;
  score = 0;
  questionNumber = 1
};

//function to load/reload the score
function renderScore() {
  $('.score').children().remove();
  $('.score').append(`<p>Score: ${score} / 8</p>`);
};

//function to display response feedback
function displayCorrectAnswer() {
  //hide the view answer button
  hide('.view_answer_button');
  //add text that they answered correctly
  $('.show_correct_response').append(`<p>Yes! It was ${answer}!</p>`);
  //display div to show response
  show('.show_correct_response');
};

//function to display response feedback
function displayIncorrectAnswer(){
  //hide the view answer button
  hide('.view_answer_button');
  //add text that they answered incorrectly
  $('.show_correct_response').append(`<p>No. I'm afraid it wasn't ${answer}</p>`);
  //display div to show response
  show('.show_correct_response');
};

//function to advance the question number
function advanceToNextQuestion(){
  $('.next_question_button').removeClass('hide');
  questionNumber++;
  i++;
};

//collect answer and determine if correct or incorrect
function submitAnswer(){
  $('form').on('submit', event => {
    event.preventDefault();
    //record checked radio box value in variable
    answer = $('input[name=answer]:checked').val();
    //check to see if the answer is correct
    checkAnwer(answer);
  });
};

function checkAnwer(answer){
  if (answer === questions[i].author){
    score++;
    displayCorrectAnswer();
    renderScore();
    advanceToNextQuestion();
  }
  else {
    displayIncorrectAnswer();
    renderScore();
    advanceToNextQuestion();
  }
};

//function to remove appended elements
function removeChildElements(param) {
  $(param).children().remove();
};

//advance the user to the next question
function nextQuestion(){
  $('.next_question_button').on('click', event => {
    //clear the answer
    removeChildElements('.show_correct_response');
    //hide the answer section
    hide('.show_correct_response');
    //hide the next question button
    hide('.next_question_button');
    //remove the quote from the quote section
    removeChildElements('.quote');
    //remove the question number from the
    removeChildElements('.question_number');
    //display the view answer button
    show('.view_answer_button');
    askQuestion();
  })
};

$(startGame);
nextQuestion();
submitAnswer();
