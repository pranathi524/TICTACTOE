let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;  // playerX, playerO
let count = 0;
let gameOver = false;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Prevent further actions once game is over
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") 
            return; // Prevent if game is over or box already filled

        count++; // Increment move count
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true; // Disable the box after it's clicked
        
        checkWinner();
        checkDraw();
    });
});

const disablesboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true; // Disable all boxes when game ends
    });
};

const resetGame = () => {
    turn0 = true;
    gameOver = false; // Reset the game over flag
    count = 0; // Reset the move counter
    enableboxes();
    msgcontainer.classList.add("hide");
};

const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false; // Enable all boxes for a new game
        box.innerText = ""; // Clear the text on all boxes
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    gameOver = true; // Set the game over flag
    disablesboxes(); // Disable all boxes
};

const showDraw = () => {
    msg.innerText = "Match Draw! Play Again!";
    msgcontainer.classList.remove("hide");
    gameOver = true; // Set the game over flag
    disablesboxes(); // Disable all boxes
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val); // Show the winner if there's a match
                return; // Stop checking further once a winner is found
            }
        }
    }
};

const checkDraw = () => {
    // If all boxes are filled and no winner, it's a draw
    if (count === 9 && !gameOver) {
        showDraw(); // Display the draw message
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);