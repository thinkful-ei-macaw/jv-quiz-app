'use strict';
/**
 * Store structure
 */
const store = {
  questions: [
    {
      question: 'How much of the day do cats spend grooming themselves?',
      answers: {
        a: '10 to 20 percent',
        b: '30 to 50 percent',
        c: '100%',
        d: 'None'
      },
      correctAnswer: 'b'
    },
    {
      question: 'What was the name of the wealthiest cat ever?',
      answers: {
        a: 'Rex',
        b: 'Leopold',
        c: 'Blackie',
        d: 'Nala'
      },
      correctAnswer: 'c'
    },
    {
      question: 'What is a Kindle?',
      answers: {
        a: 'An Amazon e-reader',
        b: 'A group of adult cats',
        c: 'A group of Kittens',
        d: 'All of the above'
      },
      correctAnswer: 'c'
    },
    {
      question: 'Which American president was known for loving cats?',
      answers: {
        a: 'George Washington',
        b: 'Abraham Lincoln',
        c: 'Donald Trump',
        d: 'Grover Cleveland'
      },
      correctAnswer: 'b'
    },
    {
      question: 'What is the technical term for a cat lover?',
      answers: {
        a: 'Ailurophile',
        b: 'Crazy cat person',
        c: 'Audiophile',
        d: 'Ailurophobia'
      },
      correctAnswer: 'a'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  // check correct answer
  // showAnswerPage: false,
  getCurrentScore: function() {
    return this.score;
  },
  //return displayed question number
  getCurrentQuestionNumber: function() {
    return this.questionNumber;
  },
  getCurrentQuestion: function() {
    let currentQuestionNum = this.questionNumber;
    return this.questions[currentQuestionNum];
  }

};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates 

function generateStartPageHTML() {
  //Returns HTML for the start page
  return `
  <section class="quiz-score">
            <p>Score:${store.getCurrentScore()} / 5</p>
            <p>Current question: ${store.questionNumber === 0 ? 'Quiz not started' : store.questionNumber + '/ 5'}</p>
        </section>
        <section class="quiz-container">
            <p>Welcome to cat facts! You're going to learn to much about our furry friends</p>
            <button class="start js-quiz-start">Start Quiz</button>
            </section>
  `;
}

function generateQuestionHTML(question, answerProvided = true) {
  //Returns HTML for the current question

  return `
  <section class="quiz-score">
  <p>Score:${store.getCurrentScore()} / 5</p>
  <p>Current question: ${(store.getCurrentQuestionNumber() + 1)} / 5</p>
  </section>
  <section class="quiz-container">
    <div class = "question-multiple-choice">
        <h2>${question.question}</h2>
        <form>
            <div class="answer">                    
                <input type="radio" name="answer-choice" value="a">
                <label for ="answer-choice">${question.answers.a}</label>
            </div>
            <div class="answer">                    
                <input type="radio" name="answer-choice" value="b">
                <label for ="answer-choice">${question.answers.b}</label>
            </div>
            <div class="answer">                    
                <input type="radio" name="answer-choice" value="c">
                <label for ="answer-choice">${question.answers.c}</label>
            </div>       
            <div class="answer">                    
                <input type="radio" name="answer-choice" value="d">
                <label for ="answer-choice">${question.answers.d}</label>
            </div>
            ${answerProvided ? '' : '<p>Please provide an answer!</p>'}
            <button class="submit" type="submit">Submit</button>                                        
        </form>
        
    </div>
  </section>
  `;
}

function generateQuestionFeedbackHTML(userAnswer, correctAnswer) {
  //TODO: Return HTML for feedback based on question (correct or incorrect)
  return `
  <section class="quiz-score">
  <p>Score:${store.getCurrentScore()} / 5</p>
  <p>Current question: ${(store.getCurrentQuestionNumber() + 1)} / 5</p>
  </section>
  <section class="quiz-container">
    <div class = "question-multiple-choice">
        <h2>Question</h2>
        <div>
            <h3>Correct answer is: ${correctAnswer}</h3>
            <p>${userAnswer ? 'This answer is correct' : 'This is incorrect'}</p>
            <button class="submit js-quiz-next">Next Question</button>                                        
        </div>
    </div>
  </section>
  `;
}

function generateFinishPageHTML() {
  //TODO: Return HTML for quiz finished with scores and restart button
  return `
   <section class="quiz-score">
    <p>Score:${store.getCurrentScore()} / 5</p>
    <p>Current question: ${(store.getCurrentQuestionNumber() + 1)} / 5</p>
    </section>
        <section class="quiz-container">
           <h2>Quiz Complete!</h2>
           <p>You got ${store.getCurrentScore()} / 5.</p>
           <button class="js-retake-quiz">Retake Quiz</button>
        </section>
  `;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render(component) {
  //Render main content
  $('main').html(component);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function clickStart() {
  //Listen for when quiz "Start" button is pressed
  $('main').on('click', '.js-quiz-start', () => {
    console.log('quiz start clicked');

    const question = store.getCurrentQuestion();
    const questionPage = generateQuestionHTML(question);

    console.log(question.answers[question.correctAnswer]);
    render(questionPage);
  });
}

function clickSubmit() {
  //Listen for when a question has been answered and submitted
  $('main').on('submit', 'form', e => {
    e.preventDefault();
    console.log('Submit question clicked');

    let answerSelected = $('input:checked').length;

    if(answerSelected === 0) {
      const question = store.getCurrentQuestion();
      const questionPage = generateQuestionHTML(question, false);
      render(questionPage);
    } else {
      showFeedback();
    }
  });
  
}

function clickNextQuestion(){
  $('main').on('click', '.js-quiz-next', e => {
    e.preventDefault();
    console.log('next button submitted');
    console.log(store.getCurrentQuestionNumber());
    
    if(store.getCurrentQuestionNumber() === (store.questions.length -1)){
      showFinishPage();
    } else {
      getNextQuestion();
    }
  });
}

function showFeedback() {

  let userAnswer = findAnswer();
  const question = store.getCurrentQuestion();
  let correctAnswer = question.answers[question.correctAnswer];

  render(generateQuestionFeedbackHTML(userAnswer, correctAnswer));
}

function getNextQuestion() {
  //increment to switch questions
  incrementQuestionNumber();
  const question = store.getCurrentQuestion();
  const questionPage = generateQuestionHTML(question);
  render(questionPage);
}

function showFinishPage() {
  const finishPage = generateFinishPageHTML();
  render(finishPage);
}

function clickRestart() {
  //TODO: Listen for when user requests Quiz restart
  $('main').on('click', '.js-retake-quiz', e => {
    e.preventDefault();
    resetScore();
    resetQuestionNumber();
    render(generateStartPageHTML());
  });
}

//Helper functions

function incrementQuestionNumber() {
  store.questionNumber++;
}

function incrementScore() {
  store.score++;
}

function resetScore(){
  store.score = 0;
}
function resetQuestionNumber(){
  store.questionNumber = 0;
}

function findAnswer() {
  //Figure out which answer was selected
  const answerValue = $('input:checked').val();
  console.log(answerValue);
  return checkCorrect(answerValue);
}

function checkCorrect(answer){
  //Compare user choice with option in question obj
  const question = store.getCurrentQuestion();
  
  let isCorrect = answer === question.correctAnswer;
  if(isCorrect) {
    incrementScore();
  }
  return isCorrect;
}

/******* Main App Start *******/

function main() {
  render(generateStartPageHTML());
  setupListeners();

  function setupListeners() {
    clickStart();
    clickSubmit();
    clickRestart();
    clickNextQuestion();
  }

}

$(main);