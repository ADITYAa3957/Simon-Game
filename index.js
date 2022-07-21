var gameStart = false;
var playerTurn = false;
var btns = ["blue", "green", "red", "yellow", "wrong"];
var gameSeq = [];
var playerSeq = [];
var level = 0;
var maxLevel = 1;
const currLevel = document.querySelector(".curr-level");
const updateLevel = () => {
    currLevel.children[0].textContent = level;
};
const startStopCurrLevel = () => {
    if (currLevel.classList.contains("curr-level-started")) {
        setTimeout(() => {
            currLevel.classList.remove("curr-level-started");
            currLevel.children[0].textContent = "_";
        }, 400);
    } else {
        setTimeout(() => {
            currLevel.classList.add("curr-level-started");
            currLevel.children[0].textContent = 1;
        }, 400)

    }
};
$(document).on("keydown", function (event) {
    if (!gameStart) {
        if (event.keyCode == 32) {
            // startGame();
            gameStart = true;
            startStopCurrLevel();
            updateHeading("Level " + level);
            ContinueGame();
        }
    }
});
$(".tile").on("click", function () {
    //this has the key pressed
    if (gameStart && playerTurn && playerSeq.length < gameSeq.length) {
        takeInput($(this));
        checkSeq();
        if (playerSeq.length == gameSeq.length) playerTurn = false;
    }
});
function generateError() {
    $("body").addClass("bg-red");
    setTimeout(() => {
        $("body").removeClass("bg-red");
        playSound(4);
    }, 250);
}
function restartGame() {
    generateError();
    startStopCurrLevel();
    updateHeading("Game Over,Press space to restart");
    level = 0;
    gameSeq = [];
    playerSeq = [];
    playerTurn = false;
    gameStart = false;
}
function updateMaxLevel() {
    if (level > maxLevel) maxLevel = level;
    $(".best-level").html(
        "<i class='fa-solid fa-trophy icon'> </i> Current Best Level:" + maxLevel
    );
}
function checkSeq() {
    if (gameSeq.slice(0, playerSeq.length).join() === playerSeq.join()) {
        if (gameSeq.length == playerSeq.length) {
            setTimeout(() => {
                ContinueGame();
            }, 700);
        }
    } else {
        updateMaxLevel();
        restartGame();
    }
}
function takeInput(tile) {
    let tile_no;
    if (tile.hasClass("blue-tile")) {
        tile_no = 0;
    } else if (tile.hasClass("green-tile")) {
        tile_no = 1;
    } else if (tile.hasClass("red-tile")) {
        tile_no = 2;
    } else {
        tile_no = 3;
    }
    onPress_1(tile_no);
    playSound(tile_no);
    playerSeq.push(tile_no);
}
function ContinueGame() {
    playerSeq = [];
    let rand = getRand();
    gameSeq.push(rand);
    setTimeout(() => {
        onPress_2(rand);
        playSound(rand);
        setTimeout(() => {
            level++;
            updateLevel();
            updateHeading("Level " + level);
            playerTurn = true;
        }, 100);
    }, 300);
}
function getRand() {
    let rand = Math.floor(Math.random() * 4);
    return rand;
}
function playSound(i) {
    let audio = new Audio("sounds/" + btns[i] + ".mp3");
    audio.play();
}
function onPress_1(i) {
    let time;
    if (level < 3) {
        time = 200;
    } else if (level < 5) {
        time = 100;
    } else {
        time = 50;
    }
    $(".tile")
        .eq(i)
        .addClass(btns[i] + "-pressed");
    setTimeout(() => {
        $(".tile")
            .eq(i)
            .removeClass(btns[i] + "-pressed");
    }, time);
}
function onPress_2(i) {
    let time;
    if (level < 3) {
        time = 200;
    } else if (level < 5) {
        time = 100;
    } else {
        time = 50;
    }
    $(".tile").eq(i).addClass("pressed");
    setTimeout(() => {
        $(".tile").eq(i).removeClass("pressed");
    }, time);
}
function updateHeading(str) {
    $(".heading").text(str);
}
