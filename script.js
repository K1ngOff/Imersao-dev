document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector("main");
    const searchInput = document.querySelector(".search-container input");
    const searchButton = document.getElementById("botao-busca");
    const themeToggleButton = document.getElementById("theme-toggle");
    const body = document.body;
    let dados = [];

    // Carrega os dados do JSON e renderiza todos os cards inicialmente.
    async function carregarDadosIniciais() {
        try {
            const resposta = await fetch("data.json");
            dados = await resposta.json();
            renderizarCards(dados);
        } catch (error) {
            console.error("Erro ao carregar os dados iniciais:", error);
        }
    }

    // Filtra os dados com base no termo de busca e renderiza os cards correspondentes.
    function buscar() {
        const termoBusca = searchInput.value.toLowerCase();
        if (termoBusca.trim() === "") {
            renderizarCards(dados); // Mostra todos se a busca estiver vazia
            return;
        }

        const resultados = dados.filter(item =>
            item.nome.toLowerCase().includes(termoBusca) ||
            item.descricao.toLowerCase().includes(termoBusca)
        );
        renderizarCards(resultados);
    }

    // Renderiza uma lista de itens no container de cards.
    function renderizarCards(items) {
        cardContainer.innerHTML = items.map(item => `
            <article>
                <h2>${item.nome}</h2>
                <p><strong>ano:</strong> ${item.ano}</p>
                <p>${item.descricao}</p>
                <a href="${item.link}" target="_blank">Saiba mais</a>
            </article>`).join('');
    }

    // Adiciona o evento de clique ao botão de busca.
    searchButton.addEventListener("click", buscar);

    // Lógica para alternar o tema
    themeToggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        // Salva a preferência do tema no localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark-mode");
            themeToggleButton.textContent = "☀️";
            themeToggleButton.title = "Alterar para modo claro";
        } else {
            localStorage.removeItem("theme");
            themeToggleButton.textContent = "🌙";
            themeToggleButton.title = "Alterar para modo escuro";
        }
    });

    // Verifica se há um tema salvo no localStorage ao carregar a página
    function aplicarTemaSalvo() {
        if (localStorage.getItem("theme") === "dark-mode") {
            body.classList.add("dark-mode");
            themeToggleButton.textContent = "☀️";
            themeToggleButton.title = "Alterar para modo claro";
        }
    }
    // Carrega os dados quando a página é totalmente carregada.
    carregarDadosIniciais();
    aplicarTemaSalvo();
});