
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


    celluleTentative.textContent = tentative;
    celluleScore.textContent = score;

    tentative++; // Incrémentation pour la prochaine soumission

}
