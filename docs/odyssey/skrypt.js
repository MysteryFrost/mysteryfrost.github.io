const regiony = [
      "kefalonia", "megaris", "fokida", "beocja", "attyka",
      "lokryda", "malis", "macedonia", "tazos", "eubea",
      "skiros", "lemnos", "lesbos", "chios", "andros",
      "achaja", "koryncja", "argolida", "keos", "hydra",
      "serifos", "paros", "naksos", "mykonos", "delos",
      "samos", "kos", "nisiros", "anafi", "thira",
      "kithira", "mesara", "pephka", "lakonia", "mesenia",
      "elis", "arkadia"
    ];

    let progres = JSON.parse(localStorage.getItem("progres")) || {};
    const tabela = document.getElementById("tabela");
    const progresDiv = document.getElementById("progres");
    const regionLosowyDiv = document.getElementById("regionLosowy");
    const losujBtn = document.getElementById("losujBtn");
    let aktualnyRegion = null;

    function zbudujTabele() {
      tabela.innerHTML = "";
      regiony.forEach(nazwa => {
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
          
          // losuje nowy region tylko jeśli właśnie ukończono aktualny
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

  progresDiv.querySelector("span").textContent = `Progres: ${procent}% (${zrobione}/${total})`;

  let pasek = progresDiv.querySelector(".pasek");
  if (!pasek) {
    pasek = document.createElement("div");
    pasek.classList.add("pasek");
    progresDiv.appendChild(pasek);
  }
  pasek.style.width = procent + "%";

  if (procent > 75)
    pasek.style.background = "linear-gradient(90deg, var(--good), var(--accent2))";
  else if (procent > 50)
    pasek.style.background = "linear-gradient(90deg, var(--warn), var(--accent2))";
  else
    pasek.style.background = "linear-gradient(90deg, var(--bad), var(--warn))";
}



    function wylosujRegion() {
      const niezrobione = regiony.filter(nazwa => !progres[nazwa]);
      if (niezrobione.length === 0) {
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

    // start
    zbudujTabele();
    pokazProgres();
    wylosujRegion();