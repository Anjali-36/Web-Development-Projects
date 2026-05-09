let boxes =document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
const winSound = new Audio('win.mp3');
const clickSound = document.getElementById("clickSound");
const clickSound1 = document.getElementById("clickSound1");
const WinnerGif = document.getElementById("img");
const WinnerGif1 = document.getElementById("img1");
const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
const resetGame = () => {
    clickSound1.currentTime = 0;
    clickSound1.play();
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    WinnerGif.classList.remove("show"); // fade out and hide the gif
    WinnerGif1.classList.remove("show"); // fade out and hide the gif
    winSound.pause();
    winSound.currentTime = 0;
    boxes.forEach(box => {
        box.classList.remove("winner-box");
    });
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
        if (turnO){
            box.innerText = "O";
            turnO = false;
        } else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinnerGif = () => {
    WinnerGif.classList.add("show"); // add fade-in
    WinnerGif.src = "https://i.pinimg.com/originals/75/9f/05/759f0557cbb379070510c9af2b9b0acf.gif"; // restart the GIF
};
const showWinnerGif1 = () => {
  WinnerGif1.classList.add("show"); // add fade-in
  WinnerGif1.src = "https://www.gifcen.com/wp-content/uploads/2022/09/fireworks-gif.gif"; // restart the GIF
};

const showWinner = (winner) => {
    msg.innerText = `🎊🎉 Congratulations!, Winner is "${winner}" 🥳🥳`;
    msgContainer.classList.remove("hide");
    winSound.currentTime = 0; // restart sound
    winSound.play();
    disableBoxes();
    showWinnerGif();
    showWinnerGif1();
}
const checkWinner = () => {
    for (pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                pattern.forEach(index => {
                    boxes[index].classList.add("winner-box"); // dark text for visibility
                    boxes[index].style.transition = "0.5s"; // smooth color change
                });
                showWinner(pos1Val);
                break;
            }
        }
    } 
};
function checkWin() {
    // Your existing logic to check winning combinations
    if (winnerFound) {
        winSound.play();  // Play the win audio
        alert(currentPlayer + " wins!");
        resetGame();
        return true;
    }
    return false;
}
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
WinnerGif.addEventListener("click", resetGame);
WinnerGif1.addEventListener("click", resetGame);
winSound.addEventListener("click", resetGame);