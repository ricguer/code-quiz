let userScore = 0;
let questionList = document.getElementsByClassName("question-answer");
let pointIncrement = (100 / questionList.length);
let currentQuestionIndex = 0;
let quizMain = document.getElementById("quiz-main");

try 
{
    quizMain.addEventListener("click", function (event) {
        let element = event.target;
    
        if (element.matches("button"))
        {
            updateUserScore(element)                                       /* Increment/Decrement User Score                       */
            goToNextQuestion();
        }
    });
} catch (error) {}


function updateUserScore(element) 
{
    let answer = element.getAttribute("data-answer");
    let resultNotice = document.getElementById("answerResult");

                                                                /* Determine whether user answer is "right" or "wrong"  */
    if (answer === "Right")
    {
        userScore += pointIncrement;                            /* Increment user score for "Right" answer              */
    }
    else if ((answer === "Wrong") && 
             (userScore > 0))
    {
        userScore -= pointIncrement;                            /* Decrement user score for "Wrong" answr except when 0 */
    }

    resultNotice.children[0].innerHTML = answer + "!";
    resultNotice.style.visibility = "visible";
}


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
        let resultNotice = document.getElementById("answerResult");

        resultNotice.style.visibility = "hidden";
        window.location = "./highscores.html";                  /* Load "High Scores" page after last quest is answered */
    }
}
