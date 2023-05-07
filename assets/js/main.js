let quizMain = document.getElementById("quiz-main");

quizMain.addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button"))
    {
        let answer = element.getAttribute("data-answer");
        let resultNotice = document.getElementById("answerResult");

        resultNotice.children[0].innerHTML = answer + "!";
        console.log(resultNotice.children[0].textContent);

        resultNotice.style.visibility = "visible";
    }
});