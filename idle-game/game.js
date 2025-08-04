// game.js – core idle loop v0.0.2-alpha-rss

let gameState = {
    woodXP: 0,
    woodLevel: 1,
    woodXPToNext: 10,
    stoneXP: 0,
    stoneLevel: 1,
    stoneXPToNext: 10,
    fishXP: 0,
    fishLevel: 1,
    fishXPToNext: 10,
    xp: 0,
    level: 1,
    xpToNext: 10,
    lastGatherTime: 0,
    wood: 0,
    stone: 0,
    fish: 0,
    woodRate: 1,
    stoneRate: 1,
    fishRate: 1,
    selectedResource: null,
    gatherStartTime: null,
    gatherCooldown: 1000, // ms per gather
    autoGather: {
        wood: false,
        stone: false,
        fish: false
    }
};

// Assign buttons once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Hook buttons for resource selection
    document.getElementById("gather-wood").addEventListener("click", () => selectResource("wood"));
    document.getElementById("gather-stone").addEventListener("click", () => selectResource("stone"));
    document.getElementById("gather-fish").addEventListener("click", () => selectResource("fish"));

    // Auto tick loop
    setInterval(() => {
        const now = Date.now();
        if (
            gameState.selectedResource &&
            now - gameState.lastGatherTime >= gameState.gatherCooldown
        ) {
            gather(gameState.selectedResource);
            gameState.lastGatherTime = now;
        }
        updateDisplay();
    }, 250); // tighter check interval
});

// Resource selection
function selectResource(resource) {
    if (gameState.selectedResource !== resource) {
        gameState.selectedResource = resource;
        gameState.gatherStartTime = Date.now();
        gameState.lastGatherTime = gameState.gatherStartTime;
        log(`Selected ${resource}`);
    } else {
        log(`Stopped gathering ${resource}`);
        gameState.selectedResource = null;
        gameState.gatherStartTime = null;
        gameState.lastGatherTime = 0;
    }
}

// Manual gather – still useful for debugging
function gather(resource) {
    gameState[resource] += gameState[`${resource}Rate`];
    const xpKey = `${resource}XP`;
    const levelKey = `${resource}Level`;
    const xpToNextKey = `${resource}XPToNext`;
    gameState[xpKey] += 1;
    if (gameState[xpKey] >= gameState[xpToNextKey]) {
        gameState[levelKey]++;
        gameState[xpKey] = 0;
        gameState[xpToNextKey] = Math.floor(gameState[xpToNextKey] * 1.5);
        log(`LEVEL UP! ${resource} is now level ${gameState[levelKey]}`);
    }
    gameState.gatherStartTime = Date.now();
    log(`${resource} +${gameState[`${resource}Rate`]}`);
    updateDisplay();

}

// Simple logger
function log(message) {
    const logEl = document.getElementById("log");
    const line = document.createElement("div");
    line.textContent = `[+] ${message}`;
    logEl.appendChild(line);

    // Limit to last 100 entries
    while (logEl.children.length > 100) {
        logEl.removeChild(logEl.firstChild);
    }

    logEl.scrollTop = logEl.scrollHeight;
}

// UI update
function updateDisplay(forceReset = false) {
    document.getElementById("wood-count").textContent = gameState.wood;
    document.getElementById("stone-count").textContent = gameState.stone;
    document.getElementById("fish-count").textContent = gameState.fish;

    ["wood", "stone", "fish"].forEach((res) => {
        const bar = document.getElementById(`${res}-progress`);
        const xpKey = `${res}XP`;
        const xpToNextKey = `${res}XPToNext`;
        if (bar && gameState[xpKey] !== undefined && gameState[xpToNextKey] !== undefined) {
            const percent = (gameState[xpKey] / gameState[xpToNextKey]) * 100;
            bar.style.width = `${percent}%`;
        }
    });
}
