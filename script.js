let welcomePage = document.querySelector("#welcome-page");

let playBtn = document.querySelector("#welcome-page .play-btn");

let quizGame = document.querySelector("#quiz-game");

let optionBtn = document.querySelectorAll("#quiz-game .option");

let questionElement = document.querySelector("#quiz-game .container h3");

let resultPage = document.querySelector("#result-page");

let winLoseText = document.querySelector("#result-page .win-lose-text");

let scoreElement = document.querySelector("#result-page span");

let restartBtn = document.querySelector("#result-page .restart");

let resultImg = document.querySelector("#result-page .win-lose-img");

let score = 0;
let questionArray = [];
let j = 0;

// play button shifts to #quiz-game and hides welcome page.
playBtn.addEventListener("click", () => {
    console.log("clicked");
    welcomePage.classList.add("fade-out");

    welcomePage.addEventListener("transitionend", () => {
        welcomePage.style.display = "none";
        quizGame.style.display = "block";
        getQuestion();
    }, { once: true })

})


// get questions and options from trivia api 
async function getQuestion() {
    try {
        let response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
        let data = await response.json();
        questionArray = data.results; // question and their options array 

        showQuestion();
    } catch (error) {
        console.error("api cant be fetched!", error);
    }

}

function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


function showQuestion() {
    console.log(questionArray[j]);

    questionElement.textContent = decodeHTML(questionArray[j].question); // puts question from array to dom element

    let options = [...questionArray[j].incorrect_answers, questionArray[j].correct_answer]; // create new array with incorrect and corrects answers

    options.sort(() => Math.random() - 0.5); // shuffle options

    optionBtn.forEach((element, i) => {
        element.textContent = decodeHTML(options[i]); // for each option btn fill them with stuff from option array
        element.onclick = () => checkAnswers(element.textContent, questionArray[j].correct_answer);
    })

}

function checkAnswers(selected, correct) {
    if (selected == correct) {
        score++;
    }
    j++;
    if (j < questionArray.length) {
        showQuestion();
    }
    else {
        quizGame.classList.add("fade-out");

        quizGame.addEventListener("transitionend", () => {
            quizGame.style.display = "none";
            resultPage.style.display = "block";
        }, { once: true })

        if (score < 5) {
            winLoseText.textContent = "oh oh! bad score😞";
            resultImg.src = "images/fail.gif";
        }
        else {
            winLoseText.textContent = "Good job! you did better than average!🎉";
            resultImg.src = "images/success.gif"
        }
        scoreElement.textContent = `${score}/10`;
        restartBtn.onclick = () => restart();
    }
}

function restart() {
    j = 0;
    score = 0;
    getQuestion();
    resultPage.style.display = "none";
    quizGame.style.display = "block";
    quizGame.classList.remove("fade-out");
}
