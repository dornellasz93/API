document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".card-jogo"));
    const btnMostrarMais = document.getElementById("btn-mostrar-mais");
    const limiteInicial = 10;
    let visiveis = limiteInicial;

    // Esconde os jogos além do limite
    cards.forEach((card, index) => {
        if (index >= limiteInicial) card.style.display = "none";
    });

    if (btnMostrarMais) {
        btnMostrarMais.addEventListener("click", () => {
            const novos = cards.slice(visiveis, visiveis + limiteInicial);
            novos.forEach(card => card.style.display = "block");
            visiveis += limiteInicial;

            if (visiveis >= cards.length) {
                btnMostrarMais.style.display = "none";
            }
        });
    }
});
