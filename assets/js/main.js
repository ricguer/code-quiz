                                                                /* ============= GLOBAL ELEMENT REFERENCES ============ */

let questionList = document.getElementsByClassName("question-answer");
let quizMain = document.getElementById("quiz-main");
let quizTimer = document.getElementById("quiz-timer");


                                                                /* ================= GLOBAL VARIABLES ================= */

let userScore = 0;
let pointIncrement = (100 / questionList.length);
let currentQuestionIndex = 0;
let secondsLeft = 25;

                                                                /* ==================== FUNCTIONS ===================== */

localStorage.setItem("userScore", userScore.toString());        /* Save user score of 0 in event user does not answer   */
startTimer();                                                   /*  */

try 
{
    quizMain.addEventListener("click", function (event) {
        let element = event.target;
    
        if (element.matches("button"))                          /* Only allow events generated from answer buttons      */
        {
            updateUserScore(element);                           /* Increment/Decrement User Score                       */
            goToNextQuestion();                                 /* Go to next question or results page                  */
        }
    });
} catch (error) {}


/**
 * Update the user score in the frontend and backend of the 
 * application.
 * @param {*} element 
 */
function updateUserScore(element) 
{
    let answer = element.getAttribute("data-answer");
    let resultNotice = document.getElementById("answer-result");

                                                                /* Determine whether user answer is "right" or "wrong"  */
    if (answer === "Right")
    {
        userScore += pointIncrement;                            /* Increment user score for "Right" answer              */
    }
    else
    {
        secondsLeft -= 5;
    }

    resultNotice.children[0].innerHTML = answer + "!";
    resultNotice.style.visibility = "visible";
}


/**
 * Determins how to move application along either by going 
 * to the next question or the "Results" page.
 */
function goToNextQuestion()
{
    let nextQuestionIndex = currentQuestionIndex + 1;

    questionList[currentQuestionIndex].style.display = "none";  /* Hide currently displayed (answered) question         */

    if (nextQuestionIndex < questionList.length)
    {
        questionList[nextQuestionIndex].style.display = "flex";
        currentQuestionIndex = nextQuestionIndex;
    }
    else
    {
        let resultNotice = document.getElementById("answer-result");

        resultNotice.style.visibility = "hidden";               /* Hide the result notification                         */

        window.location = "./results.html";                     /* Load results page after last question is answered    */
    }

                                                                /* Save user score to local storage                     */
    localStorage.setItem("userScore", userScore.toString());
}


/**
 * Starts quiz timer. In the event the timer reaches 0, the
 * results page will be loaded.
 */
function startTimer() 
{
    let timerInterval = setInterval(function() {
    secondsLeft--;
    quizTimer.textContent = "Time: " + secondsLeft;             /* Update timer on user interface                       */

    if(secondsLeft === 0) 
    {
        clearInterval(timerInterval);                           /* Clear interval once timer expires                    */
        window.location = "./results.html";                     /* Load results page after last question is answered    */
    }

    }, 1000);
}
