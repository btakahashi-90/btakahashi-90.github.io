// game.js – core idle loop v0.0.1-alpha-poopen

let gameState = {
  wood: 0,
  stone: 0,
  fish: 0,
  woodRate: 1,
  stoneRate: 1,
  fishRate: 1,
  autoGather: {
    wood: false,
    stone: false,
    fish: false
  }
};

// Assign buttons once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Hook buttons
  document.getElementById("gather-wood").addEventListener("click", () => gather("wood"));
  document.getElementById("gather-stone").addEventListener("click", () => gather("stone"));
  document.getElementById("gather-fish").addEventListener("click", () => gather("fish"));

  // Auto tick loop
  setInterval(() => {
    for (let resource in gameState.autoGather) {
      if (gameState.autoGather[resource]) {
        gather(resource);
      }
    }
    updateDisplay();
  }, 1000); // 1-second tick
});

// Gather function
function gather(resource) {
  gameState[resource] += gameState[`${resource}Rate`];
  log(`${resource} +${gameState[`${resource}Rate`]}`);
  updateDisplay();
}

// Simple logger
function log(message) {
  const logEl = document.getElementById("log");
  const line = document.createElement("div");
  line.textContent = `[+] ${message}`;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

// UI update
function updateDisplay() {
  document.getElementById("wood-count").textContent = gameState.wood;
  document.getElementById("stone-count").textContent = gameState.stone;
  document.getElementById("fish-count").textContent = gameState.fish;
}

