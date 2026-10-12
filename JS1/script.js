// B. Array de filmes com 8 itens completos
let filmes = [
    { titulo: "The Matrix", ano: 1999, genero: "Ficção", nota: 8.7, poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300" },
    { titulo: "Blade Runner 2049", ano: 2017, genero: "Cyberpunk", nota: 8.0, poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300" },
    { titulo: "Interestelar", ano: 2014, genero: "Ficção", nota: 8.7, poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300" },
    { titulo: "Oppenheimer", ano: 2023, genero: "Drama", nota: 8.9, poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300" },
    { titulo: "A Rede Social", ano: 2010, genero: "Drama", nota: 7.8, poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300" },
    { titulo: "Toy Story", ano: 1995, genero: "Animação", nota: 8.3, poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300" },
    { titulo: "Mad Max: Estrada da Fúria", ano: 2015, genero: "Ação", nota: 8.1, poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300" },
    { titulo: "Cyberpunk: Edgerunners", ano: 2022, genero: "Cyberpunk", nota: 8.3, poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300" }
];

let filmesExibidos = [...filmes];
let favoritos = [];

// Elementos do DOM
const containerCatalogo = document.getElementById("catalogo");
const spanContador = document.getElementById("contador");
const campoBusca = document.getElementById("busca");
const selectGenero = document.getElementById("filtro-genero");
const btnInverter = document.getElementById("btn-inverter");
const spanContadorFav = document.getElementById("contador-favoritos");
const listaFavoritos = document.getElementById("lista-favoritos");
const btnLimparFav = document.getElementById("btn-limpar-favoritos");
const topoHero = document.getElementById("topo-hero");
const logoCatalogo = document.getElementById("logo-catalogo");

// C. Exibindo o catálogo dinamicamente
function mostrarFilmes(lista) {
    containerCatalogo.innerHTML = "";

    if (lista.length === 0) {
        containerCatalogo.innerHTML = `<p class="sem-filmes">Nenhum filme encontrado.</p>`;
        spanContador.innerText = "0";
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        const f = lista[i];
        const badge = f.nota >= 8 ? `<span class="selo-recomendado">⭐ Recomendado</span>` : "";
        const idx = filmes.findIndex(item => item.titulo === f.titulo);

        const card = document.createElement("div");
        card.className = "card-filme";
        card.innerHTML = `
            <img src="${f.poster}" alt="${f.titulo}" class="poster-grade">
            <h4>${f.titulo}</h4>
            <p class="ano">${f.ano} &bull; <strong>${f.genero}</strong></p>
            <p class="nota">Nota: ${f.nota} / 10</p>
            ${badge}
            <button class="btn-favoritar" onclick="favoritar(${idx})">❤️ Favoritar</button>
        `;
        containerCatalogo.appendChild(card);
    }

    spanContador.innerText = lista.length;
}

// D. Busca em tempo real por título
campoBusca.addEventListener("input", function() {
    const termo = campoBusca.value.toLowerCase().trim();
    const filtrados = [];

    for (let f of filmes) {
        if (f.titulo.toLowerCase().includes(termo)) {
            filtrados.push(f);
        }
    }

    filmesExibidos = filtrados;
    selectGenero.value = "Todos";
    mostrarFilmes(filmesExibidos);
});

// E. Filtro por gênero
selectGenero.addEventListener("change", function() {
    const gen = selectGenero.value;
    if (gen === "Todos") {
        filmesExibidos = [...filmes];
    } else {
        filmesExibidos = filmes.filter(f => f.genero === gen);
    }
    campoBusca.value = "";
    mostrarFilmes(filmesExibidos);
});

// F. Inverter ordem
btnInverter.addEventListener("click", function() {
    filmesExibidos.reverse();
    mostrarFilmes(filmesExibidos);
});

// G. Favoritos
function favoritar(indice) {
    const filme = filmes[indice];
    if (!favoritos.includes(filme.titulo)) {
        favoritos.push(filme.titulo);
        atualizarFavoritos();
    }
}

function atualizarFavoritos() {
    spanContadorFav.innerText = favoritos.length;
    listaFavoritos.innerHTML = "";

    if (favoritos.length === 0) {
        listaFavoritos.innerHTML = `<li class="fav-vazio">Nenhum filme favoritado até o momento.</li>`;
        return;
    }

    for (let t of favoritos) {
        const li = document.createElement("li");
        li.innerText = t;
        listaFavoritos.appendChild(li);
    }
}

btnLimparFav.addEventListener("click", function() {
    favoritos = [];
    atualizarFavoritos();
});

// H. Interação com mouse (element.style)
topoHero.addEventListener("mouseenter", function() {
    topoHero.style.backgroundColor = "#0284c7";
    logoCatalogo.style.color = "#ffffff";
});

topoHero.addEventListener("mouseleave", function() {
    topoHero.style.backgroundColor = "#1e293b";
    logoCatalogo.style.color = "rgb(56, 189, 248)";
});

// Inicialização
mostrarFilmes(filmes);