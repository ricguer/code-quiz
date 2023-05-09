                                                                /* ============= GLOBAL ELEMENT REFERENCES ============ */

let questionList = document.getElementsByClassName("question-answer");
const clearHighScoresBtn = document.getElementById("clear-high-scores-btn");


                                                                /* ==================== FUNCTIONS ===================== */

createListOfHighScores();                                       /* Create and update list of high scores                */


/**
 * Checks whether there are scores in local storage. If 
 * there are not, no list will be generated. If there 
 * are, a list of high scores will be generated and shown
 * to the user.
 */
function createListOfHighScores() 
{
    const highScoreList = document.getElementById("high-score-list");
    
    if (localStorage.length <= 0)                               /* Check whether there are any saved scores             */
    {
        let highScoreItem = document.createElement("li");       /* Create a list element                                */

        while (highScoreList.hasChildNodes())                   /* Clear high scores list on user interface             */
        {
            highScoreList.removeChild(highScoreList.firstChild);
        }

        highScoreItem.textContent = "No High Scores";           /* Let user know there are no high scores               */
        highScoreList.appendChild(highScoreItem);               /* Append message to list element                       */
    }
    else
    {
        let sortedHighScores = sortHighScores();                /* Generate sorted list of high scores                  */

                                                                /* Cycle through all local storage elements             */
        for (let index = 0; sortedHighScores.length > 0; index++)
        {
            let highScoreItem = document.createElement("li");   /* Create list element to store user details            */
            let key = sortedHighScores.pop();                   /* Retrieve user initials and pop from array            */
            let value = localStorage.getItem(key);              /* Retrive user score                                   */
            
                                                                /* Set text of list item to user details                */
            highScoreItem.textContent = (index + 1).toString() + ". " + key + " - " + value;

            highScoreList.appendChild(highScoreItem);           /* Add list item to high score list                     */
        }
    }
}


/**
 * Sorts localStorage user scores and returns ordered list
 * in ascending order. 
 * 
 * @returns Sorted high score list
 */
function sortHighScores()
{
    let localStorStr = JSON.stringify(localStorage);            /* Stringify localStorage objects                       */
    let localStorObj = JSON.parse(localStorStr);                /* Parse JSON string into JSON objects                  */

                                                                /* Sort high score list by scores in ascending order    */
    let sortedHighScores = Object.keys(localStorObj).sort((a,b) => localStorObj[a] - localStorObj[b]);

    return sortedHighScores;
}


/**
 * Event listener for clearing the local storage of high 
 * scores.
 */
clearHighScoresBtn.addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button"))
    {
        localStorage.clear();
        createListOfHighScores();
    }
});
