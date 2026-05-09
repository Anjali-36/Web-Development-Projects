let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg")
const userscore = document.querySelector("#user-score");
const compscore = document.querySelector("#computer-score");
// sound effects:-
const clickSound = new Audio("click.wav");
const winSound = new Audio("win.wav");
const loseSound = new Audio("lose.wav");
const rockSound = new Audio("rock.wav");
const paperSound = new Audio("paper.wav");
const scissorsSound = new Audio("scissors.wav");

const genCompChoice = () => {
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was draw 🤝. Play again.";
    msg.style.backgroundColor = "#103b6dff";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userscore.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice} 🥳👏🏻`;
        msg.style.backgroundColor = "#0a8d0aff";
        winSound.currentTime = 0;
        winSound.play();
    } else {
        compScore++;
        compscore.innerText = compScore;
        msg.innerText = `You Lost. ${compChoice} beats Your ${userChoice} 😓`;
        msg.style.backgroundColor = "#9e0808ff";
        loseSound.currentTime = 0;
        loseSound.play();
    }
};

const playChoiceSound = (choice) => {
    if (choice === "rock") {
        rockSound.currentTime = 0;
        rockSound.play();
    } else if (choice === "paper") {
        paperSound.currentTime = 0;
        paperSound.play();
    } else if (choice === "scissors") {
        scissorsSound.currentTime = 0;
        scissorsSound.play();
    }
};

const playGame = (userChoice) =>{
    // Generate computer choice
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        // Draw Game
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            // rock, scissors
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper"){
            // paper, scissors
            userWin = compChoice === "scissors" ? false : true;
        } else {
            // rock, paper
            userWin = compChoice === "rock" ? false : true;
        } 
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) =>{
    choice.addEventListener("click",() => {
        clickSound.currentTime = 0;
        clickSound.play();
        const userChoice = choice.getAttribute("id");
        playChoiceSound(userChoice);
        playGame(userChoice);
    });
});