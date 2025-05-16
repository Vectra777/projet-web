document.addEventListener("DOMContentLoaded", () => {
  // 1. Animation de slide
  let currentSlide = 0;
  const slides = document.querySelector('.slides');
  if (slides) {
    const totalSlides = slides.children.length;
    window.moveSlide = function(direction) {
      currentSlide += direction;
      if (currentSlide < 0) currentSlide = totalSlides - 1;
      if (currentSlide >= totalSlides) currentSlide = 0;
      const offset = -currentSlide * 100;
      slides.style.transform = `translateX(${offset}%)`;
    };
  }

  // 2. Animation au scroll (intersection observer)
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

  // 3. Compteur de plastique
  let count = 0;
  const plasticKgPerSecond = 250;
  const counter = document.getElementById("plasticCount");
  if (counter) {
    setInterval(() => {
  count += plasticKgPerSecond;
  counter.textContent = count.toLocaleString();

  // Ajout temporaire de l’effet "grow"
  counter.classList.add("grow");
  setTimeout(() => counter.classList.remove("grow"), 300);
}, 1000);
  } else {
    console.warn("⚠️ Élément #plasticCount non trouvé !");
  }

  // 4. Quiz
  window.submitQuiz = function () {
    let score = 0;

    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === "q1r") score += 4;

    const q2a = document.getElementById("q2a");
    const q2b = document.getElementById("q2b");
    const q2c = document.getElementById("q2c");

    if (q2a?.checked) score += 3;
    if (q2b?.checked) score += 3;
    if (q2c?.checked) score -= 3;

    const q3 = document.getElementById("q3")?.value.toLowerCase() || "";
    const motsCles = [
      "ramasser", "déchets", "plage", "réduire", "plastique", "recyclage",
      "ne pas jeter", "tri", "sensibiliser", "réutiliser", "utiliser gourde",
      "éviter plastique", "participer", "nettoyage", "consommer local", "produits durables"
    ];
    const contientMotCle = motsCles.some(mot => q3.includes(mot));
    if (contientMotCle) score += 10;

    const resultat = document.getElementById("resultat");
    if (score < 10) {
      resultat.style.color = "red";
    } else if (score < 14) {
      resultat.style.color = "orange";
    } else if (score < 18) {
      resultat.style.color = "#90ee90";
    } else {
      resultat.style.color = "#006400";
    }
    resultat.textContent = `Votre score est : ${score} points`;
  };
});
document.addEventListener("DOMContentLoaded", () => {
  // Vérifie si on est bien sur la page "Poisson"
  const classesAutorisées = ["Index_poisson", "Index_Mammifere", "Index_Coraux"];
const bodyClassList = document.body.classList;

// Si aucune des classes autorisées n’est présente, on quitte
if (![...bodyClassList].some(cls => classesAutorisées.includes(cls))) return;

  document.addEventListener('mousemove', (e) => {
    const bubble = document.createElement('div');
    bubble.classList.add('cursor-bubble');
    bubble.style.left = `${e.pageX}px`;
    bubble.style.top = `${e.pageY}px`;
    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 300);
  });
});
function generateFloatingEmoji() {
  const body = document.body;

  let emojis = ['🌊']; // valeur par défaut

  if (body.classList.contains('Index_poisson')) {
    emojis = ['🐟', '🐠', '🐡'];
  } else if (body.classList.contains('Index_Mammifere')) {
    emojis = ['🐬', '🐳', '🐋'];
  } else if (body.classList.contains('Index_Coraux')) {
    emojis = ['🍀', '🪸', '🌿'];
  }

  const emoji = document.createElement('div');
  emoji.classList.add('floating-emoji');
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // Position aléatoire
  emoji.style.top = `${Math.random() * 100}vh`;
  emoji.style.left = `${Math.random() * 100}vw`;

  document.getElementById('emoji-container').appendChild(emoji);

  // Supprimer après 3 secondes
  setTimeout(() => emoji.remove(), 3000);
}

// Créer les emojis toutes les 500ms
setInterval(generateFloatingEmoji, 500);


