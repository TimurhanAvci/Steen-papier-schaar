// --- CONSTANTEN ---
const humanOutput    = document.querySelector("#human");
const computerOutput = document.querySelector("#computer");
const resultOutput   = document.querySelector("#result");

// Scorebord constanten
const scoreJijEl    = document.querySelector("#scoreJij");
const scoreGelijkEl = document.querySelector("#scoreGelijk");
const scorePCEl     = document.querySelector("#scorePC");

// QuerySelectorAll: alle knoppen in 1 keer ophalen (pagina 9)
const btns = document.querySelectorAll("button");

// --- VARIABELEN ---
let humanChoice    = "";
let computerChoice = "";
let scoreJij    = 0;
let scoreGelijk = 0;
let scorePC     = 0;

// --- FUNCTIES ---

// Geeft de emoji terug die bij een keuze hoort
function getEmoji(keuze) {
  // Switch vervangt de if/else if keten (pagina 11)
  switch (keuze) {
    case "Steen":  return "✊ Steen";
    case "Papier": return "✋ Papier";
    case "Schaar": return "✌️ Schaar";
  }
}

// Genereert een willekeurige keuze voor de computer
function getComputerKeuze() {
  const keuzes = ["Steen", "Papier", "Schaar"];
  const randomNumber = Math.floor(Math.random() * 3);
  return keuzes[randomNumber];
}

// Bepaalt de winnaar en past het scorebord en de banner aan
function controleerSpel() {
  // Reset de styling klasse van de resultatenbalk
  resultOutput.className = "result-banner";

  if (humanChoice === computerChoice) {
    // Gelijkspel
    scoreGelijk++;
    scoreGelijkEl.textContent = scoreGelijk;
    resultOutput.classList.add("draw");
    resultOutput.innerHTML = "🤝 Gelijkspel! Opnieuw spelen.";
  } else if (
    (humanChoice === "Steen"  && computerChoice === "Schaar") ||
    (humanChoice === "Schaar" && computerChoice === "Papier") ||
    (humanChoice === "Papier" && computerChoice === "Steen")
  ) {
    // Speler wint
    scoreJij++;
    scoreJijEl.textContent = scoreJij;
    resultOutput.classList.add("win");
    resultOutput.innerHTML = "🎉 Jij wint! " + humanChoice + " verslaat " + computerChoice + ".";
  } else {
    // Computer wint
    scorePC++;
    scorePCEl.textContent = scorePC;
    resultOutput.classList.add("lose");
    resultOutput.innerHTML = "💻 Computer wint! " + computerChoice + " verslaat " + humanChoice + ".";
  }
}

// --- EVENT LISTENERS ---
// QuerySelectorAll: 1 loop vervangt 3 aparte event listeners (pagina 9)
btns.forEach(function(btn) {
  btn.addEventListener("click", function(event) {
    // Haal de keuze op uit de data-keuze attribuut van de knop
    humanChoice    = btn.dataset.keuze;
    computerChoice = getComputerKeuze();

    // Toon de keuzes in de arena
    humanOutput.innerHTML    = getEmoji(humanChoice);
    computerOutput.innerHTML = getEmoji(computerChoice);

    // Alert alleen bij steen (opdracht uit de foto)
    if (humanChoice === "Steen") {
      console.log("Klik event triggered: ", event);
      alert("Klik event triggered");
    }

    controleerSpel();
  });
});
