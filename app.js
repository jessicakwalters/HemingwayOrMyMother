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
}

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
}

//function to clear radio buttons
function clearCheckboxes() {
  $('input[name=answer]').prop('checked', false);
}

//function to write new quote
function displayQuote(){
  clearCheckboxes();
  $('.quote').append(`<p>${questions[i].quote}</p>`);
  renderScore();
  writeQuestionNumber();
}

//function to write question
function writeQuestionNumber() {
  $('.question_number').append(`<p>Question number: ${questionNumber} of 8</p>`)
}

//display question logic
function askQuestion(){
  if (i === 0) {
    //on the first load, display main
  $('main').removeClass('hide');
  //remove any children elements from the quote section
  $('.quote').children().remove();
  //remove any children elements from the question number section
  $('.question_number').children().remove();
  //write the quote to the screen
  displayQuote();
  }
  //after the last quote is displayed
  else if (i === questions.length){
    //reveal the final score section
    $('.final').removeClass('hide');
    //hide main section
    $('main').addClass('hide');
    //show final score
    renderScore();
    //reset all variables in case they want to play again
    i = 0;
    score = 0;
    questionNumber = 1
    //restart the game
    startGame();
  }
  else {
  displayQuote();
  }
};

//function to load/reload the score
function renderScore() {
  $('.score').children().remove();
  $('.score').append(`<p>Score: ${score} / 8</p>`);
};

function displayCorrectAnswer() {
  //hide the view answer button
  $('.view_answer_button').addClass('hide');
  //add text that they answered correctly
  $('.show_correct_response').append(`<p>Yes! It was ${answer}!</p>`);
  //display div to show response
  $('.show_correct_response').removeClass('hide');
};

function displayIncorrectAnswer(){
  //hide the view answer button
  $('.view_answer_button').addClass('hide');
  //add text that they answered incorrectly
  $('.show_correct_response').append(`<p>No. I'm afraid it wasn't ${answer}</p>`);
  //display div to show response
  $('.show_correct_response').removeClass('hide');
}

function advanceToNextQuestion(){
  $('.next_question_button').removeClass('hide');
};
//collect answer
function submitAnswer(){
  $('form').on('submit', event => {
    event.preventDefault();
    //record checked radio box value in variable
    answer = $('input[name=answer]:checked').val();
    //check to see if the answer is correct
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
    questionNumber++;
    i++;
  });
}


function nextQuestion(){
  $('.next_question_button').on('click', event => {
    //clear the answer
    $('.show_correct_response').children().remove();
    //hide the answer section
    $('.show_correct_response').addClass('hide');
    //hide the next question button
    $('.next_question_button').addClass('hide');
    //remove the quote from the quote section
    $('.quote').children().remove();
    //remove the question number from the
    $('.question_number').children().remove();
    //display the view answer button
    $('.view_answer_button').removeClass('hide');
    askQuestion();
  })
}

$(startGame);
nextQuestion();
submitAnswer();
