// ARENA — GAME LOGIC
lucide.createIcons();

// CONFIG
const WIN_TARGET = 3; // first to 3 round-wins takes the match

const CHOICES = {
  rock: { beats: "scissors", icon: "hand-fist" },
  paper: { beats: "rock", icon: "hand" },
  scissors: { beats: "paper", icon: "scissors" },
};

// STATE
let playerScore = 0;
let opponentScore = 0;
let currentStreak = 0;
let lastWinner = null; // "player" | "opponent" | null
let roundHistory = [];
let matchOver = false;

// DOM REFERENCES
const choiceDock = document.getElementById("choiceDock");
const playerScoreEl = document.getElementById("playerScore");
const opponentScoreEl = document.getElementById("opponentScore");
const matchStatus = document.getElementById("matchStatus");
const streakFlag = document.getElementById("streakFlag");

const logToggle = document.getElementById("logToggle");
const logClose = document.getElementById("logClose");
const matchLog = document.getElementById("matchLog");
const logEntries = document.getElementById("logEntries");

const resultFlood = document.getElementById("resultFlood");
const resultIcon = document.getElementById("resultIcon");
const resultWord = document.getElementById("resultWord");
const resultDetail = document.getElementById("resultDetail");
const rematchBtn = document.getElementById("rematchBtn");

// COMPUTER CHOICE
function getComputerChoice() {
  const options = Object.keys(CHOICES); // ["rock", "paper", "scissors"]
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// ROUND COMPARISON
function compareChoices(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";
  if (CHOICES[playerChoice].beats === computerChoice) return "win";
  return "lose";
}

// ROUND HANDLER
function handleChoice(playerChoice) {
  if (matchOver) return;

  const computerChoice = getComputerChoice();
  const outcome = compareChoices(playerChoice, computerChoice);

  updateScoreAndStreak(outcome);
  logRound(playerChoice, computerChoice, outcome);
  showRoundResult(playerChoice, computerChoice, outcome);
}

// SCORE & STREAK
function updateScoreAndStreak(outcome) {
  if (outcome === "win") {
    playerScore += 1;
    lastWinner === "player" ? (currentStreak += 1) : (currentStreak = 1);
    lastWinner = "player";
  } else if (outcome === "lose") {
    opponentScore += 1;
    lastWinner === "opponent" ? (currentStreak += 1) : (currentStreak = 1);
    lastWinner = "opponent";
  } else {
    currentStreak = 0;
    lastWinner = null;
  }

  playerScoreEl.textContent = playerScore;
  opponentScoreEl.textContent = opponentScore;

  updateStreakFlag();
}

function updateStreakFlag() {
  if (currentStreak >= 2) {
    const who = lastWinner === "player" ? "YOU" : "RIVAL";
    streakFlag.textContent = `${who} — ${currentStreak} STREAK`;
    streakFlag.hidden = false;
  } else {
    streakFlag.hidden = true;
  }
}

// MATCH LOG
function logRound(playerChoice, computerChoice, outcome) {
  roundHistory.push({ playerChoice, computerChoice, outcome });

  const entry = document.createElement("div");
  entry.className = "log-entry";

  const outcomeLabel =
    outcome === "win" ? "WIN" : outcome === "lose" ? "LOSS" : "DRAW";

  entry.innerHTML = `
    <span>R${roundHistory.length} — ${playerChoice} vs ${computerChoice}</span>
    <span class="log-entry-outcome ${outcome}">${outcomeLabel}</span>
  `;

  logEntries.prepend(entry); // newest round appears at the top
}

// RESULT FLOOD DISPLAY
function showRoundResult(playerChoice, computerChoice, outcome) {
  resultFlood.className = "result-flood"; // reset classes
  resultFlood.classList.add(`flood-${outcome}`);

  resultIcon.setAttribute(
    "data-lucide",
    outcome === "win" ? "trophy" : outcome === "lose" ? "skull" : "minus",
  );

  resultWord.textContent =
    outcome === "win" ? "VICTORY" : outcome === "lose" ? "DEFEAT" : "DRAW";
  resultDetail.textContent = `${capitalize(playerChoice)} vs ${capitalize(computerChoice)}`;

  resultFlood.hidden = false;
  lucide.createIcons(); // re-render the new icon we just injected

  requestAnimationFrame(() => {
    resultFlood.classList.add("is-visible");
  });

  // Check for match end
  if (playerScore >= WIN_TARGET || opponentScore >= WIN_TARGET) {
    matchOver = true;
    toggleChoiceButtons(false);

    setTimeout(() => {
      const matchWinner =
        playerScore >= WIN_TARGET
          ? "YOU WIN THE MATCH"
          : "RIVAL WINS THE MATCH";
      matchStatus.textContent = matchWinner;
      rematchBtn.hidden = false;
    }, 700);
  } else {
    setTimeout(hideResultFlood, 1400);
  }
}

function hideResultFlood() {
  resultFlood.classList.remove("is-visible");
  setTimeout(() => {
    resultFlood.hidden = true;
  }, 300);
}

// REMATCH
function handleRematch() {
  playerScore = 0;
  opponentScore = 0;
  currentStreak = 0;
  lastWinner = null;
  roundHistory = [];
  matchOver = false;

  playerScoreEl.textContent = 0;
  opponentScoreEl.textContent = 0;
  matchStatus.textContent = "FIRST TO 3";
  streakFlag.hidden = true;
  logEntries.innerHTML = "";
  rematchBtn.hidden = true;

  toggleChoiceButtons(true);
  hideResultFlood();
}

// UI HELPERS
function toggleChoiceButtons(enabled) {
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.classList.toggle("is-disabled", !enabled);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// MATCH LOG PANEL TOGGLE
function openLog() {
  matchLog.hidden = false;
  requestAnimationFrame(() => matchLog.classList.add("is-open"));
}

function closeLog() {
  matchLog.classList.remove("is-open");
  setTimeout(() => {
    matchLog.hidden = true;
  }, 280);
}

// EVENT LISTENERS
choiceDock.addEventListener("click", (event) => {
  const btn = event.target.closest(".choice-btn");
  if (!btn) return;
  handleChoice(btn.dataset.choice);
});

logToggle.addEventListener("click", openLog);
logClose.addEventListener("click", closeLog);
rematchBtn.addEventListener("click", handleRematch);
