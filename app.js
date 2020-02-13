'use strict';
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
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
  getCurrentScore: function() {
    return this.score;
  },
  getCurrentQuestion: function() {
    return this.questionNumber;
  },
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
  //TODO: Returns HTML for the start page
  return `
  <section class="quiz-score">
            <p>Score:${store.getCurrentScore()} / 5</p>
            <p>Current question: 0 / 5</p>
        </section>
        <section class="quiz">
            <p>Quiz description text</p>
            <button id="js-quiz-start" class="start">Start Quiz</button>
            </section>
  `;
}

function generateQuestionHTML() {
  //TODO: Returns HTML for the current question
  return `
  <section class="quiz-score">
  <p>Score:${store.getCurrentScore()} / 5</p>
  <p>Current question: ${store.getCurrentQuestion()} / 5</p>
</section>
<section class="quiz">
  <div class = "question-multiple-choice">
      <h2>Question</h2>
      <form>
          <div class = "answer">                    
              <input type="radio" name ="answer-choice" value="a">
              <label for ="answer-choice">Answer Choice</label>
          </div>
          <div class = "answer">                    
              <input type="radio" name ="answer-choice" value="b">
              <label for ="answer-choice">Answer Choice</label>
          </div>
          <div class = "answer">                    
              <input type="radio" name ="answer-choice" value="c">
              <label for ="answer-choice">Answer Choice</label>
          </div>       
          <div class = "answer">                    
              <input type="radio" name ="answer-choice" value="d">
              <label for ="answer-choice">Answer Choice</label>
          </div>   
          <button class="submit" type="submit">Submit</button>                                        
      </form>
      
  </div>
</section>
  `;
}

function generateQuestionFeedbackHTML() {
  //TODO: Return HTML for feedback based on question (correct or incorrect)
}

function generateFinishPageHTML() {
  //TODO: Return HTML for quiz finished with scores and restart button
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render(component) {
  //TODO: Render main content and trigger score update
  $('main').html(component);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function clickStart() {
  //TODO: Listen for when quiz "Start" button is pressed
  $('main').on('click', '#js-quiz-start', () => {
    console.log('quiz start clicked');
    const questionPage = generateQuestionHTML();
    render(questionPage);
  });
}

function clickSubmit() {
  //TODO: Listen for when a question has been answered and submitted
  $('main').on('click', '.submit', e => {
    e.preventDefault();
    console.log('Submit question clicked');
  });
}

function findAnswer() {
  //TODO: figure out which answer was selected
}

function clickRestart() {
  //TODO: Listen for when user requests Quiz restart
}

/******* Main App Start *******/

function main() {
  render(generateStartPageHTML());
  setupListeners();

  function setupListeners() {
    clickStart();
    clickSubmit();
    findAnswer();
    clickRestart();
  }

}

$(main);