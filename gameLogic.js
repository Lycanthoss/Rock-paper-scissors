//#region UI FUNCTIONS

function toggleElement(element) {
    if (element.style.display === "none")
        element.style.display = "block";
    else element.style.display = "none";
}

function toggleOverlay() {
    if (overlay.style.width == "100%") {
        overlay.style.width = "0%";
        overlay.style.visibility = "hidden";
        overlay.style.opacity = "0";
        overlay.style.fontSize = "0rem";
    }
    else {
        overlay.style.width = "100%";
        overlay.style.visibility = "visible";
        overlay.style.opacity = "1";
        overlay.style.fontSize = "2rem";
    }
}

function updateScore() {
    player_score_item.textContent = player_score_int;
    ai_score_item.textContent = ai_score_int;
}

function toggleDarkMode() {
    if (dark_mode) {
        dark_mode = false;
        root.style.setProperty("--button-border", "rgb(29, 21, 21)");
        root.style.setProperty("--button-hover", "rgb(58, 219, 144)");
        root.style.setProperty("--button-click", "rgb(175, 170, 166)");
        root.style.setProperty("--main-background", "rgb(212, 212, 212)");
        root.style.setProperty("--main-text", "rgb(29, 21, 21)");
        root.style.setProperty("--button-background", "rgba(0, 255, 234, 0.733)");
        root.style.setProperty("--overlay-background", "rgba(136, 136, 136, 0.801)");
        root.style.setProperty("--overlay-link-color", "rgb(58, 219, 144)");
    }
    else {
        dark_mode = true;
        root.style.setProperty("--button-border", "rgb(126, 45, 45)");
        root.style.setProperty("--button-hover", "rgb(38, 34, 61)");
        root.style.setProperty("--button-click", "rgb(104, 62, 62)");
        root.style.setProperty("--main-background", "#1d1d1d");
        root.style.setProperty("--main-text", "rgb(255, 176, 176)");
        root.style.setProperty("--button-background", "rgb(173, 58, 58)");
        root.style.setProperty("--overlay-background", "rgba(24, 23, 32, 0.911)");
        root.style.setProperty("--overlay-link-color", "rgb(102, 62, 25)");
    }
}

//#endregion UI_FUNCTIONS

//#region HTML VARIABLES

let styles = getComputedStyle(document.documentElement);
let root = document.documentElement;

let overlay = document.getElementById("overlay");
let menu_button = document.getElementById("menu-button");
let reset_button = document.getElementById("reset-button");
let dark_mode_button = document.getElementById("dark-mode-switch");
let dark_mode = true;

let play_button = document.getElementById("play-button");

let rock_button = document.getElementById("rock");
let paper_button = document.getElementById("paper");
let scissors_button = document.getElementById("scissors");

let scoreDiv = document.getElementById("score");
let selectors = document.getElementById("selectors");

let player_score_item = document.getElementById("player-score");
let ai_score_item = document.getElementById("AI-score");
let player_score_int = 0;
let ai_score_int = 0;

//#endregion HTML_VARIABLES

//#region EVENT LISTENERS

menu_button.addEventListener("click", () => {
    toggleOverlay();
});

reset_button.addEventListener("click", () => {
    resetGame();
    toggleOverlay();
});

dark_mode_button.addEventListener("click", () => {
    toggleDarkMode();
});

play_button.addEventListener("click", () => {
    toggleElement(play_button);
    scoreDiv.style.display = "flex";
    selectors.style.display = "flex";
});

rock_button.addEventListener("click", () => {
    manageScore(CHOICES.rock);
    updateScore();
});
paper_button.addEventListener("click", () => {
    manageScore(CHOICES.paper);
    updateScore();
});
scissors_button.addEventListener("click", () => {
    manageScore(CHOICES.scissors);
    updateScore();
});

//#endregion EVENT_LISTENERS

//#region CONSTANTS AND RNG GENERATION

const CHOICES = {
    rock: "rock",
    paper: "paper",
    scissors: "scissors"
};
Object.freeze(CHOICES);

function computerPlay() {
    let randomNum = Math.floor(Math.random() * 4);
    switch (randomNum) {
        case 1: return CHOICES.rock;
        case 2: return CHOICES.paper;
        case 3: return CHOICES.scissors;
        default: return CHOICES.rock;
    }
}

//#endregion CONSTANTS AND RNG GENERATION

//#region GAME LOGIC

function playRound(playerSelection, computerSelection) {
    let lowerSelection = playerSelection.toLowerCase();

    if (lowerSelection == computerSelection) 0;
    if ((lowerSelection == CHOICES.rock && computerSelection == CHOICES.scissors) ||
        (lowerSelection == CHOICES.scissors && computerSelection == CHOICES.paper) ||
        (lowerSelection == CHOICES.paper && computerSelection == CHOICES.rock))
        return 1;
    else return -1;
}

function manageScore(playerChoice) {
    let aiChoice = computerPlay();

    let roundOutcome = playRound(playerChoice, aiChoice);

    switch(roundOutcome) {
        case -1: ai_score_int++; break;
        case 0: return;
        case 1: player_score_int++; break;
    }
}

function resetGame() {
    player_score_int = 0;
    ai_score_int = 0;
    updateScore();
}

//#endregion GAME LOGIC