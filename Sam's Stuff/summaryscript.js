// Summary implementation by Sam
const aliasTitle = document.getElementById("name");
const scoreTitle = document.getElementById("score");
const shotsTitle = document.getElementById("shotsTaken");
const accuracyTitle = document.getElementById("accuracy");
const hitsTitle = document.getElementById("targetsHit");

const alias = localStorage.getItem("name");
const score = localStorage.getItem("score");
const shots = parseInt(localStorage.getItem("shots"),10);
const hits = parseInt(localStorage.getItem("hits"),10);

aliasTitle.textContent = aliasTitle.textContent + alias;
scoreTitle.textContent = scoreTitle.textContent + score;
shotsTitle.textContent = shotsTitle.textContent + shots;
hitsTitle.textContent = hitsTitle.textContent + hits;

// validation to prevent division by zero

if (shots > 0)
{
    const accuracy = Math.ceil((hits / shots) * 100);
    accuracyTitle.textContent = accuracyTitle.textContent + accuracy + "%";
}
else
{
    accuracyTitle.textContent = accuracyTitle.textContent + "N/A (No Shots)";
}

// Recent scores "leaderboard" implemented by SAM

const scoreOne = document.getElementById("scoreOne");
const scoreTwo = document.getElementById("scoreTwo");
const scoreThree = document.getElementById("scoreThree");

let scoresList = JSON.parse(localStorage.getItem('recentScores')) || [];

scoresList.push(score);

localStorage.setItem('recentScores', JSON.stringify(scoresList));

scoreOne.innerHTML = "Score: " + scoresList[scoresList.length-1];
scoreTwo.innerHTML = "Score: " + scoresList[scoresList.length-2];
scoreThree.innerHTML = "Score: " + scoresList[scoresList.length-3];