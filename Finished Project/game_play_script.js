//elements from game being used
const game = document.getElementById("game");
const skyLane = document.getElementById("skyLane");
const lane1 = document.getElementById("lane1");
const lane2 = document.getElementById("lane2");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const levelNumText = document.getElementById("levelNum");
const userName = document.getElementById("name");

//the name of the user saved (implemented by Sam)
const alias = localStorage.getItem("name");
userName.textContent = "NAME: " + alias;

//the widths and heights of the different lanes in the game
let skyLaneLength = 0;
let lane1Length = 0;
let lane2Length = 0;
let skyLaneHeight = 0;
let lane1Height = 0;
let lane2Height = 0;

//variables used throughout the engine

let ticks = 0; //for timer
let level = 1; //for tracking the level
let score = 0; //for tracking the score through each level
let hits = 0; //for tracking how many targets were hit
let shots = 0; //for tracking the amount of shots taken

//the sounds used in the project
let normalSound = new Audio('Resources/normal.mp3')
let canSound = new Audio('Resources/can.mp3')
let duckSound = new Audio('Resources/duck.mp3')
let capybaraSound = new Audio('Resources/capybara.mp3')

//for incrementing "shots" variable
game.addEventListener("click", function () {
    shots++;
})

//timer
setInterval(function () {
    ticks++;

    let animLevelNum;

    //for resetting the timer and changing the level when the time is reached
    switch (level) {
        case 1:
            timerText.textContent = `TIMER: ${ticks} / 90`;

            if (ticks == 90) { //after a min and a half, level 2 starts
                level = 2;
                ticks = 0;

                levelNumText.textContent = `LEVEL: ${level} - MEDIUM`;

                animLevelNum = levelNumText.animate(
                    [{ transform: `translateY(-${Math.floor(game.offsetHeight * 0.5)}px) scale(2)` },
                    { transform: `translateY(-${Math.floor(game.offsetHeight * 0.5)}px) scale(2)` },
                    { transform: `translateY(0px) scale(1)` }],
                    { duration: 2000, iterations: 1 });
            }
            break;

        case 2:
            timerText.textContent = `TIMER: ${ticks} / 120`;

            if (ticks == 120) { //after 2 min, level 3 starts
                level = 3;
                ticks = 0;

                levelNumText.textContent = `LEVEL: ${level} - HARD`;

                animLevelNum = levelNumText.animate(
                    [{ transform: `translateY(-${Math.floor(game.offsetHeight * 0.5)}px) scale(2)` },
                    { transform: `translateY(-${Math.floor(game.offsetHeight * 0.5)}px) scale(2)` },
                    { transform: `translateY(0px) scale(1)` }],
                    { duration: 2000, iterations: 1 });
            }
            break;

        case 3:
            timerText.textContent = `TIMER: ${ticks} / 90`;

            if (ticks == 90) { //after a min and a half, the summary is shown
                localStorage.setItem("score", score);
                localStorage.setItem("shots", shots);
                localStorage.setItem("hits", hits);
                window.location.href = "summary.html";
            }
            break;
    }

}, 1000)

//Animation for targets spawning on left side, except for capybara
function leftNormalAnimation(obj, width, height, properties) {
    return obj.animate(
        [{ transform: `translate(${Math.floor(-(width * 0.1))}px, 0px)` },
        { transform: `translate(${Math.floor(width * 0.083)}px, ${Math.floor(height * 0.2)}px)` },
        { transform: `translate(${Math.floor(width * 0.267)}px, 0px)` },
        { transform: `translate(${Math.floor(width * 0.45)}px, ${Math.floor(height * 0.2)}px)` },
        { transform: `translate(${Math.floor(width * 0.633)}px, 0px)` },
        { transform: `translate(${Math.floor(width * 0.817)}px, ${Math.floor(height * 0.2)}px)` },
        { transform: `translate(${Math.floor(width * 1)}px, 0px)` }],
        properties);
}

//Animation for targets spawning on right side, except for capybara
function rightNormalAnimation(obj, width, height, properties) {
    return obj.animate(
        [{ transform: `translate(${Math.floor(width * 1)}px, 0px)` },
        { transform: `translate(${Math.floor(width * 0.817)}px, ${Math.floor(height * 0.2)}px)` },
        { transform: `translate(${Math.floor(width * 0.633)}px, 0px)` },
        { transform: `translate(${Math.floor(width * 0.45)}px, ${Math.floor(height * 0.2)}px)` },
        { transform: `translate(${Math.floor(width * 0.267)}px, 0px)` },
        { transform: `translate(${Math.floor(width * 0.083)}px, ${Math.floor(height * 0.2)}px)` },
        { transform: `translate(${Math.floor(-(width * 0.1))}px, 0px)` }],
        properties);
}

//Animation for capybaras spawning on left side
function leftCapybaraAnimation(obj, width, properties) {
    return obj.animate(
        [{ transform: `translateX(${Math.floor(-(width * 0.1))}px)` },
        { transform: `translateX(${Math.floor(width * 0.067)}px)` },
        { transform: `translateX(${Math.floor(width * 0.233)}px)` },
        { transform: `translateX(${Math.floor(width * 0.40)}px)` },
        { transform: `translateX(${Math.floor(width * 0.567)}px)` },
        { transform: `translateX(${Math.floor(width * 0.733)}px)` },
        { transform: `translateX(${Math.floor(width * 0.9)}px)` }],
        properties);
}

//Animation for capybaras spawning on right side
function rightCapybaraAnimation(obj, width, properties) {
    return obj.animate(
        [{ transform: `translateX(${Math.floor(width * 0.9)}px)` },
        { transform: `translateX(${Math.floor(width * 0.733)}px)` },
        { transform: `translateX(${Math.floor(width * 0.567)}px)` },
        { transform: `translateX(${Math.floor(width * 0.40)}px)` },
        { transform: `translateX(${Math.floor(width * 0.233)}px)` },
        { transform: `translateX(${Math.floor(width * 0.067)}px)` },
        { transform: `translateX(${Math.floor(-(width * 0.1))}px)` }],
        properties);
}

//Sam's random number generator
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//determines the type of target
function typeChooser(level) {

    //for randomisation
    let type = randomInt(1, 100);
    let result;

    switch (level) {
        case 1:
            if (type < 34) {
                result = "normal";
            }

            else if (type > 33 && type < 68) {
                result = "can";
            }

            else if (type > 67) {
                result = "duck";
            }
            break;

        case 2:
            if (type < 26) {
                result = "normal";
            }

            else if (type > 25 && type < 51) {
                result = "can";
            }

            else if (type > 50 && type < 76) {
                result = "duck";
            }

            else if (type > 75) {
                result = "capybara";
            }
            break;

        case 3:
            if (type < 26) {
                result = "normal";
            }

            else if (type > 25 && type < 51) {
                result = "can";
            }

            else if (type > 50 && type < 76) {
                result = "duck";
            }

            else if (type > 75) {
                result = "capybara";
            }
            break;
    }

    return result;
}

//animation properties for easy and medium
const normalTime = {
    duration: 2500,
    easing: "linear",
    fill: "forwards"
};

//animation properties for hard
const hardTime = {
    duration: 2000,
    easing: "linear",
    fill: "forwards"
};

//spawns the targets, lane and side are random
const targetCreator = function (lane, side, level) {

    const target = document.createElement('div');
    const wood = document.createElement('div');

    target.style.position = 'absolute';

    //selects the type and the features that go along with it
    let type = typeChooser(level);

    if (type == "capybara") {
        target.style.bottom = `0%`;
    }
    else {
        target.style.bottom = `20%`;

        wood.style.position = 'absolute';
        wood.setAttribute("class", `wood ${type}`);
        wood.style.left = `0px`;

        switch (lane) {
            case 1:
                lane1.appendChild(wood);
                break;

            case 2:
                lane2.appendChild(wood);
                break;

            case 3:
                skyLane.appendChild(wood);
                break;
        }

    }

    target.setAttribute("class", `target ${type}`);

    let width;
    let height;

    switch (lane) {
        case 1:
            width = lane1Length;
            height = lane1Height;
            lane1.appendChild(target);
            break;

        case 2:
            width = lane2Length;
            height = lane2Height;
            lane2.appendChild(target);
            break;

        case 3:
            width = skyLaneLength;
            height = skyLaneHeight;
            skyLane.appendChild(target);
            break;
    }

    let animtarget;
    let animwood;

    target.style.left = `0px`;

    switch (side) {

        case 1: //animation for targets that spawn on the left side

            if (level < 3) { //for easy and medium difficulty

                if (type == "capybara") {
                    animtarget = leftCapybaraAnimation(target, width, normalTime);
                }
                else {
                    animtarget = leftNormalAnimation(target, width, height, normalTime);

                    animwood = leftNormalAnimation(wood, width, height, normalTime);
                }
            }
            else { //for hard difficulty

                if (type == "capybara") {
                    animtarget = leftCapybaraAnimation(target, width, hardTime);
                }
                else {
                    animtarget = leftNormalAnimation(target, width, height, hardTime);

                    animwood = leftNormalAnimation(wood, width, height, hardTime);
                }
            }
            break;

        case 2: //animation for targets that spawn on the right side

            if (level < 3) { //for easy and medium difficulty

                if (type == "capybara") {
                    animtarget = rightCapybaraAnimation(target, width, normalTime);
                }
                else {
                    animtarget = rightNormalAnimation(target, width, height, normalTime);

                    animwood = rightNormalAnimation(wood, width, height, normalTime);
                }
            }
            else { //for hard difficulty

                if (type == "capybara") {
                    animtarget = rightCapybaraAnimation(target, width, hardTime);
                }
                else {
                    animtarget = rightNormalAnimation(target, width, height, hardTime);

                    animwood = rightNormalAnimation(wood, width, height, hardTime);
                }
            }
            break;
    }

    // Audio functionality implemented by SAM

    let audio = new Audio('Resources/shot.mp3');
    const checkbox = document.getElementById("audio");


    //the end animation functions and click events
    if (type == "capybara") {
        animtarget.finished.then(function () {
            target.remove();
        })

        target.addEventListener("click", function () {
            if (score > 50) {
                score -= 50;
            }
            else {
                score = 0;
            }

            if (checkbox.checked) {
                capybaraSound.play();
                audio.play();
            } //SAM

            scoreText.innerHTML = `SCORE: ${score} `;
        })
    }
    else {

        animtarget.finished.then(function () {
            target.remove();
        })

        animwood.finished.then(function () {
            wood.remove();
        })

        switch (type) {
            case "normal":
                target.addEventListener("click", function () {
                    hits++;
                    score += 20;
                    target.remove();
                    wood.remove();

                    if (checkbox.checked) {
                        normalSound.play();
                        audio.play();
                    } //SAM

                    scoreText.innerHTML = `SCORE: ${score} `;
                })
                break;

            case "can":
                target.addEventListener("click", function () {
                    hits++;
                    score += 30;

                    if (checkbox.checked) {
                        canSound.play();
                        audio.play();
                    } //SAM

                    target.remove();
                    wood.remove();
                    scoreText.innerHTML = `SCORE: ${score} `;
                })
                break

            case "duck":
                target.addEventListener("click", function () {
                    hits++;
                    score += 10;

                    if (checkbox.checked) {
                        duckSound.play();
                        audio.play();
                    } //SAM

                    target.remove();
                    wood.remove();
                    scoreText.innerHTML = `SCORE: ${score} `;
                })
                break;
        }
    }

}

let fps = 0;

const gamerender = function () {
    fps++;

    skyLaneLength = skyLane.offsetWidth;
    lane1Length = lane1.offsetWidth;
    lane2Length = lane2.offsetWidth;
    skyLaneHeight = skyLane.offsetHeight;
    lane1Height = lane1.offsetHeight;
    lane2Height = lane2.offsetHeight;

    if (level < 3) {
        if (fps % 25 == 0) {
            targetCreator(randomInt(1, 4), randomInt(1, 3), level);
            fps;
        }
    }
    else {
        if (fps % 20 == 0) {
            targetCreator(randomInt(1, 4), randomInt(1, 3), level);
            fps;
        }
    }

    window.requestAnimationFrame(gamerender);
}

window.requestAnimationFrame(gamerender);


