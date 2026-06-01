// --- CONSTANTEN ---
const feestdagLijst = document.querySelector("#feestdagLijst");

// Het huidige jaar ophalen
const huidigJaar = new Date().getFullYear();

// URL van de API (NL = Nederland)
const apiUrl = "https://date.nager.at/api/v3/PublicHolidays/" + huidigJaar + "/NL";

// --- FUNCTIES ---

// Berekent hoeveel dagen het nog duurt tot een bepaalde datum
function berekenDagenTot(datumString) {
  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0); // Tijd op 00:00 zetten voor eerlijke vergelijking
  const feestdag = new Date(datumString);
  const verschil = feestdag - vandaag;
  return Math.ceil(verschil / (1000 * 60 * 60 * 24)); // milliseconden naar dagen
}

// Formatteert een datum naar leesbare Nederlandse tekst (bijv. "25 december 2026")
function formateerDatum(datumString) {
  const datum = new Date(datumString);
  return datum.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Toont de feestdagen in de lijst op de pagina
function toonFeestdagen(feestdagen) {
  // Filter: alleen feestdagen die nog komen
  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);

  const komende = feestdagen.filter(function(feestdag) {
    return new Date(feestdag.date) >= vandaag;
  });

  // Toon de eerste 5 eerstvolgende feestdagen
  const eersteVijf = komende.slice(0, 5);

  // Maak de lijst leeg
  feestdagLijst.innerHTML = "";

  // Voeg elke feestdag toe als een lijstitem
  eersteVijf.forEach(function(feestdag) {
    const dagenTot = berekenDagenTot(feestdag.date);

    // Maak een nieuw lijstitem aan
    const li = document.createElement("li");
    li.className = "feestdag-item";

    // Badge tekst bepalen
    let badgeTekst = "";
    if (dagenTot === 0) {
      badgeTekst = "Vandaag! 🎉";
    } else if (dagenTot === 1) {
      badgeTekst = "Morgen!";
    } else {
      badgeTekst = "Nog " + dagenTot + " dagen";
    }

    // HTML invullen
    li.innerHTML =
      '<div>' +
        '<div class="feestdag-naam">' + feestdag.localName + '</div>' +
        '<div class="feestdag-datum">' + formateerDatum(feestdag.date) + '</div>' +
      '</div>' +
      '<span class="dagen-badge">' + badgeTekst + '</span>';

    feestdagLijst.appendChild(li);
  });
}

// --- API AANROEP (fetch) ---
// GET request naar de feestdagen API (moderne manier zoals in het PDF)
fetch(apiUrl)
  .then(function(response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function(data) {
    // Data ontvangen, toon de feestdagen
    toonFeestdagen(data);
  })
  .catch(function(error) {
    // Foutmelding tonen als de API niet bereikbaar is
    feestdagLijst.innerHTML = '<li class="fout">Kon feestdagen niet laden. Probeer het later opnieuw.</li>';
    console.error("Er was een probleem met de fetch:", error);
  });
