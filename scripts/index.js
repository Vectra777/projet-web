
  let currentSlide = 0;
  const slides = document.querySelector('.slides');
  const totalSlides = slides.children.length;

  function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;

  }

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".resource-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.classList.add("fade-in");
    observer.observe(card);
  });
});

console.log("Je suis la console !");

function quizAlert() {
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();
}

function quizConfirm() {
var res = confirm("Etes-vous sûr de vouloir continuer ?");
if (res == true) {
alert("Le quiz va commencer dans 5 secondes !");
//ajouter un décompte de 5 secondes
var timer = 5;
//Créer un élément p pour afficher le message
var confirmation = document.createElement("p");
confirmation.textContent = timer + " secondes";
//style du message
confirmation.style.color = "red";
confirmation.style.fontSize = "1.5em";
confirmation.style.fontWeight = "bold";
confirmation.style.textAlign = "center";
//ajouter le message à la page à la suite du bouton d'id start
var start = document.getElementById("informations");
start.appendChild(confirmation);
//en utilisant la fonction setInterval qui s'exécute toutes les secondes
var interval = setInterval(function () {
//décrémenter le décompte
timer--;
//On l’affiche également dans la console
console.log(timer);
//afficher le décompte dans l’élément p créé
confirmation.textContent = timer + " secondes";
//si le décompte est terminé
//afficher le message "C'est parti ! Bonne chance !"
//afficher le formulaire
//afficher le bouton de soumission
if (timer == 0) {
clearInterval(interval);
confirmation.textContent = "C'est parti ! Bonne chance !";
document.getElementsByClassName("quiz")[0].style.display = "block";
document.getElementsByTagName("button")[0].style.display = "block";
document.getElementById("Quizbutton").style.display = "none";
}
}, 1000);
} else {
alert("Vous allez être redirigé vers la page d'accueil !");
window.location.href = "./accueil.html";
}
const startBtn = document.querySelector(".Quizbutton");
if (startBtn) startBtn.style.display = "none";
}

// Compteur global des tentatives
let tentative = 1;

function submitQuiz() {
    let score = 0;

    // Question 1 (radio) : bonne réponse = value="q1r"
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === "q1r") {
        score += 4;
    }

    // Question 2 (checkboxes)
    const q2a = document.getElementById("q2a"); // bonne
    const q2b = document.getElementById("q2b"); // bonne
    const q2c = document.getElementById("q2c"); // mauvaise

    if (q2a.checked) score += 3;
    if (q2b.checked) score += 3;
    if (q2c.checked) score -= 3;

    // Question 3 (texte)
    const q3 = document.getElementById("q3").value.toLowerCase();
    const motsCles = ["réduire", "alléger", "faciliter", "optimiser", "exploiter"];
    const contientMotCle = motsCles.some(mot => q3.includes(mot));
    if (contientMotCle) {
        score += 10;
    }

    // Affichage du score (optionnel)
    document.getElementById("resultat").textContent = `Votre score est : ${score} points`;

    // Ajouter la tentative au tableau des résultats
    const tableau = document.getElementById("resultatsTableau");
    const ligne = tableau.insertRow(-1); // ajoute à la fin
    const celluleTentative = ligne.insertCell(0);
    const celluleScore = ligne.insertCell(1);

    celluleTentative.textContent = tentative;
    celluleScore.textContent = score;

    tentative++; // Incrémentation pour la prochaine soumission

}
