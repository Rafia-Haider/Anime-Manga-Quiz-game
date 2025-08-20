let welcomePage = document.querySelector("#welcome-page");

let playBtn = document.querySelector("#welcome-page .play-btn");

let quizGame = document.querySelector("#quiz-game");


playBtn.addEventListener("click", () => {
    console.log("clicked");
    welcomePage.classList.add("fade-out");

    welcomePage.addEventListener("transitionend", () => {
        welcomePage.style.display = "none";
        quizGame.style.display = "block";
    },{once: true})

})

fetch()
.then()
.then()
.catch(err=>{
    console.log(err,"error fetching the API");
})