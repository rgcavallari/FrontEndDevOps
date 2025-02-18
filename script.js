// Definir as imagens de fundo para cada seção
const sectionBackgrounds = {
    moedas: "url('moedas-background.jpg')",
    livros: "url('livros-background.jpg')",
    games: "url('games-background.jpg')"
};

// Função para trocar a imagem de fundo
function changeBackground(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            document.body.style.backgroundImage = sectionBackgrounds[sectionId];
        }
    });
}

// Criar o Observer
const observer = new IntersectionObserver(changeBackground, {
    threshold: 0.5 // Considerar a seção como visível quando 50% dela estiver visível
});

// Observar as seções
const sections = document.querySelectorAll("section");
sections.forEach(section => {
    observer.observe(section);
});
