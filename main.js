class Utilizador {
    constructor(id, nome, email) {
        this.ativo = true;
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
    desativar() {
        this.ativo = false;
    }
}
let filterOrder = false;
let filterShowActive = false;
let filterWord = "";
let listaUtilizadores = [];
let InitialUsers = [
    { id: 1, nome: "Beatriz Guerreiro", email: "bialarag@gmail.com" },
    { id: 2, nome: "Greicelle Silva", email: "greicellesilva@gmail.com" },
    { id: 3, nome: "Daniel Pina", email: "danielteclado@gmail.com" },
    { id: 4, nome: "Tomás José", email: "tomecas@gmail.com" },
    { id: 5, nome: "Ana Luísa", email: "anuxaHspl@gmail.com" },
    { id: 6, nome: "Ricky", email: "tom&Jerry@gmail.com" },
];
getNewUserFormData();
loadInitialUsers();
createBtnShowActiveUsers();
createBtnSearch();
createBtnCloseModal();
createBtnAz();
createBtnResetFilter();
function renderUserCard(user) {
    let elementoLista = document.createElement("li");
    elementoLista.setAttribute("class", "userCard");
    let containerUtilizador = document.createElement("div");
    containerUtilizador.setAttribute("class", "containerPai");
    let containerTarefas = document.createElement("div");
    containerTarefas.textContent = "No tasks assigned";
    let nomeUser = document.createElement("h2");
    nomeUser.textContent = user.nome;
    let infoUtilizador = document.createElement("p");
    let userId = document.createElement("p");
    userId.textContent = "ID: " + user.id;
    infoUtilizador.textContent = user.email;
    elementoLista.appendChild(containerUtilizador);
    containerUtilizador.appendChild(nomeUser);
    containerUtilizador.appendChild(userId);
    elementoLista.appendChild(containerTarefas);
    containerUtilizador.appendChild(infoUtilizador);
    infoUtilizador.appendChild(addLogInState(user));
    containerUtilizador.appendChild(createBtnActivateToggle(user));
    containerUtilizador.appendChild(createBtnRemove(user));
    containerUtilizador.appendChild(createBtnSeeMore(user));
    return elementoLista;
}
function renderUtilizadores() {
    renderDebugData();
    let listaDeUtilizadores = document.getElementById("dadosUtilizador");
    listaDeUtilizadores.innerHTML = "";
    let lista = listaUtilizadores;
    if (filterWord) {
        let listaUserSearched = [];
        for (let i = 0; i < listaUtilizadores.length; i++) {
            let palavraMagica = (listaUtilizadores[i].nome).toLowerCase().includes(filterWord);
            if (palavraMagica) {
                listaUserSearched.push(listaUtilizadores[i]);
            }
        }
        lista = listaUserSearched;
    }
    if (filterOrder == true) {
        let listaCopiada = lista.slice();
        let userOrdered = listaCopiada.sort((a, b) => a.nome.localeCompare(b.nome));
        lista = userOrdered;
    }
    if (filterShowActive == true) {
        let listaUtilizadoresAtivos = lista.filter((utilizador) => utilizador.ativo == true);
        lista = listaUtilizadoresAtivos;
    }
    for (let i = 0; i < lista.length; i++) {
        listaDeUtilizadores.appendChild(renderUserCard(lista[i]));
    }
    renderFilterBtnOrder();
    renderFilterBtnActiveUsers();
    renderTotalUsersBadge();
    renderAtiveUsersBadge();
    renderUserCount();
    renderActiveUsersPercentage();
}
function addLogInState(user) {
    let span = document.createElement("span");
    if (user.ativo == true) {
        span.textContent = " Logged in";
        span.classList.add("activo");
    }
    else {
        span.textContent = " Logged out";
        span.classList.add("desativo");
    }
    return span;
}
function createBtnSeeMore(user) {
    let btnVerMais = document.createElement("button");
    btnVerMais.textContent = "See more";
    btnVerMais.addEventListener("click", () => renderModalUser(user.id));
    return btnVerMais;
}
function createBtnRemove(user) {
    let btnRemover = document.createElement("button");
    btnRemover.textContent = "Remove";
    btnRemover.addEventListener("click", () => removeUsers(user.id));
    return btnRemover;
}
function createBtnActivateToggle(user) {
    let btnDesativar = document.createElement("button");
    btnDesativar.textContent = "Activate toggle";
    btnDesativar.addEventListener("click", () => {
        switchUserState(user.id);
        renderInactiveUsersBadge();
    });
    return btnDesativar;
}
function switchUserState(identificador) {
    let listaUtilizadorParaDesativar = listaUtilizadores.filter((utilizador) => utilizador.id == identificador);
    let utilizadorParaDesativar = listaUtilizadorParaDesativar[0];
    if (utilizadorParaDesativar.ativo) {
        utilizadorParaDesativar.ativo = false;
    }
    else {
        utilizadorParaDesativar.ativo = true;
    }
    renderUtilizadores();
}
function createBtnShowActiveUsers() {
    let btnMostrarAtivos = document.getElementById("btnSoAtivos");
    btnMostrarAtivos.addEventListener("click", () => renderLoggedInUsers());
}
function renderLoggedInUsers() {
    filterShowActive = true;
    renderUtilizadores();
}
function getNewUserFormData() {
    let formNewUser = document.getElementById("formNewUser");
    let inputNome = document.getElementById("nomeUtilizador");
    let inputEmail = document.getElementById("emailUtilizador");
    let array = [];
    formNewUser.addEventListener("submit", (event) => {
        event.preventDefault();
        array = createNewUser(inputNome, inputEmail);
    });
}
function createNewUser(nomeDoUtilizador, emailDoUtilizador) {
    let nome = nomeDoUtilizador.value;
    let email = emailDoUtilizador.value;
    let span = document.getElementById("spanMsgInfo");
    let listaAtb = [];
    listaAtb.push(nome, email);
    let id = Date.now();
    for (let i = 0; i <= 5; i++) {
        id = id + 1;
    }
    if (email.includes("@") && email.includes(".")) {
        let novoUtilizador = new Utilizador(id, nome, email);
        listaUtilizadores.push(novoUtilizador);
        span.textContent = "*";
    }
    else {
        span.textContent = '* Confirme o uso dos seguintes caracteres "@" e "."';
    }
    renderUtilizadores();
    return listaAtb;
}
function renderAtiveUsersBadge() {
    let contadorAtivos = document.getElementById("utilizadoresAtivos");
    let listaUtilizadoresAtivos = listaUtilizadores.filter((utilizador) => utilizador.ativo == true);
    contadorAtivos.textContent = String(listaUtilizadoresAtivos.length);
    return listaUtilizadoresAtivos.length;
}
function renderTotalUsersBadge() {
    let contador = listaUtilizadores.length;
    let badge = document.getElementById("utilizadoresTotais");
    badge.textContent = String(contador);
}
function renderInactiveUsersBadge() {
    let contadorInativos = document.getElementById("utilizadoresInativos");
    let listaUtilizadoresInativos = listaUtilizadores.filter(utilizador => utilizador.ativo == false);
    let numContadorInativo = listaUtilizadoresInativos.length;
    contadorInativos.textContent = String(numContadorInativo);
}
function removeUsers(identificador) {
    let listaSemInativos = listaUtilizadores.filter(utilizador => utilizador.id != identificador);
    listaUtilizadores = listaSemInativos;
    renderUtilizadores();
}
function createBtnSearch() {
    let inputPesquisa = document.getElementById("pesquisaUtilizadores");
    let btnPesquisa = document.getElementById("pesquisar");
    inputPesquisa.addEventListener("input", () => searchUser(inputPesquisa.value));
}
function searchUser(palavraInserida) {
    filterWord = palavraInserida;
    renderUtilizadores();
}
function renderModalUser(identificador) {
    let user = (listaUtilizadores.filter(utilizador => utilizador.id == identificador))[0];
    let modal = document.getElementById("modalReservas");
    let titulo = document.getElementById("userName");
    titulo.textContent = user.nome;
    let email = document.getElementById("userEmail");
    email.textContent = user.email;
    let toggleState = document.getElementById("userState");
    if (user.ativo) {
        toggleState.textContent = "Active user";
    }
    else {
        toggleState.textContent = "Inactive user";
    }
    let startingDate = document.getElementById("userAdesionDate");
    let dataAdesao = new Date();
    let mesAdesao = dataAdesao.getMonth() + 1;
    let diaAdesao = dataAdesao.getDate();
    let anoAdesao = dataAdesao.getFullYear();
    startingDate.textContent = "User started on " + String(diaAdesao) + "/" + String(mesAdesao) + "/" + String(anoAdesao);
    modal.classList.add("show");
}
function createBtnCloseModal() {
    let btnFecharModal = document.getElementById("closeModal");
    btnFecharModal.addEventListener("click", () => closeModal());
}
function closeModal() {
    let modal = document.getElementById("modalReservas");
    modal.classList.remove("show");
}
function renderUserCount() {
    let usersTotal = document.getElementById("statsTotal");
    return listaUtilizadores.length;
}
function renderActiveUsersPercentage() {
    let usersActivePercentage = document.getElementById("activeUsersPercentage");
    let totalAtivos = renderAtiveUsersBadge();
    let totalUsers = renderUserCount();
    let percentage = (totalAtivos / totalUsers) * 100;
    usersActivePercentage.textContent = "Active users: " + String(percentage.toFixed(2)) + "%";
}
function loadInitialUsers() {
    for (let i = 0; i < InitialUsers.length; i++) {
        let newUser = new Utilizador(InitialUsers[i].id, InitialUsers[i].nome, InitialUsers[i].email);
        listaUtilizadores.push(newUser);
    }
    renderUtilizadores();
}
function createBtnAz() {
    let btnAz = document.getElementById("orderAZ");
    btnAz.addEventListener("click", () => {
        orderArray();
    });
}
function orderArray() {
    filterOrder = true;
    renderUtilizadores();
}
function createBtnResetFilter() {
    let btnResetFilters = document.getElementById("btnResetAllFilters");
    btnResetFilters.addEventListener("click", () => resetAllFilters());
}
function resetAllFilters() {
    filterOrder = false;
    filterShowActive = false;
    filterWord = "";
    renderUtilizadores();
}
function renderFilterBtnActiveUsers() {
    let btnMostrarAtivos = document.getElementById("btnSoAtivos");
    if (filterShowActive == true) {
        btnMostrarAtivos.classList.add("filterActive");
    }
    else {
        btnMostrarAtivos.classList.remove("filterActive");
    }
}
function renderFilterBtnOrder() {
    let btnAz = document.getElementById("orderAZ");
    if (filterOrder == true) {
        btnAz.classList.add("filterActive");
    }
    else {
        btnAz.classList.remove("filterActive");
    }
}
function renderDebugData() {
    let debugDiv = document.querySelector("#debug");
    let divTasks = document.createElement("div");
    debugDiv.innerHTML = "";
    for (let i = 0; i < listaUtilizadores.length; i++) {
        const line = document.createElement("div");
        line.textContent = JSON.stringify(listaUtilizadores[i]);
        debugDiv.appendChild(line);
    }
    debugDiv.appendChild(divTasks);
}
