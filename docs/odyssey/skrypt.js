const regiony = [
    "kefalonia","megaris","fokida","beocja","attyka",
    "lokryda","malis","macedonia","tazos","eubea",
    "skiros","lemnos","lesbos","chios","andros",
    "achaja","koryncja","argolida","keos","hydra",
    "serifos","paros","naksos","mykonos","delos",
    "samos","kos","nisiros","anafi","thira",
    "kithira","mesara","pephka","lakonia","mesenia",
    "elis","arkadia"
].sort();

let progres = JSON.parse(localStorage.getItem("progres")) || {};
const tabela = document.getElementById("tabela");
const progresDiv = document.querySelector(".progres");
const pasek = progresDiv.querySelector(".pasek");
const progresText = progresDiv.querySelector(".progres-text");
const regionLosowyDiv = document.getElementById("regionLosowy");
const losujBtn = document.getElementById("losujBtn");
const searchInput = document.getElementById("searchRegion");
let aktualnyRegion = null;

function zbudujTabele() {
    tabela.innerHTML = "";
    regiony.forEach(nazwa => {
        if (!nazwa.toLowerCase().includes(searchInput.value.toLowerCase())) return;

        const tr = document.createElement("tr");
        const tdNazwa = document.createElement("td");
        const tdCheckbox = document.createElement("td");

        tdNazwa.textContent = nazwa.charAt(0).toUpperCase() + nazwa.slice(1);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = progres[nazwa] || false;
        checkbox.addEventListener("change", () => {
            progres[nazwa] = checkbox.checked;
            localStorage.setItem("progres", JSON.stringify(progres));
            pokazProgres();
            if (aktualnyRegion && nazwa === aktualnyRegion && checkbox.checked) {
                wylosujRegion();
            }
        });

        tdCheckbox.appendChild(checkbox);
        tr.appendChild(tdNazwa);
        tr.appendChild(tdCheckbox);
        tabela.appendChild(tr);
    });
}

function pokazProgres() {
    const zrobione = Object.values(progres).filter(v => v).length;
    const total = regiony.length;
    const procent = Math.round((zrobione / total) * 100);

    progresText.textContent = `Progres: ${procent}% (${zrobione}/${total})`;

    pasek.style.width = procent + "%";
    if (procent > 75) pasek.style.background = "linear-gradient(90deg, var(--good), var(--accent2))";
    else if (procent > 50) pasek.style.background = "linear-gradient(90deg, var(--warn), var(--accent2))";
    else pasek.style.background = "linear-gradient(90deg, var(--bad), var(--warn))";
}

function wylosujRegion() {
    const niezrobione = regiony.filter(nazwa => !progres[nazwa]);
    if (!niezrobione.length) {
        regionLosowyDiv.textContent = "🔥 Wszystko wyczyszczone! Czas na ouzo!";
        regionLosowyDiv.style.color = "lime";
        aktualnyRegion = null;
        return;
    }
    aktualnyRegion = niezrobione[Math.floor(Math.random() * niezrobione.length)];
    regionLosowyDiv.textContent = `Dzisiaj męczysz się z: ${aktualnyRegion.toUpperCase()}`;
    regionLosowyDiv.style.color = "#ffd60a";
}

losujBtn.addEventListener("click", wylosujRegion);
searchInput.addEventListener("input", zbudujTabele);

// start
zbudujTabele();
pokazProgres();
wylosujRegion();
