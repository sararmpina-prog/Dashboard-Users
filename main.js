var Utilizador = /** @class */ (function () {
    function Utilizador(id, nome, email) {
        this.ativo = true;
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
    Utilizador.prototype.desativar = function () {
        this.ativo = false;
    };
    return Utilizador;
}());
var filterOrder = false;
var filterShowActive = false;
var filterWord = "";
var listaUtilizadores = [];
var InitialUsers = [
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
    var elementoLista = document.createElement("li");
    elementoLista.setAttribute("class", "userCard");
    var containerUtilizador = document.createElement("div");
    containerUtilizador.setAttribute("class", "containerPai");
    var containerTarefas = document.createElement("div");
    containerTarefas.textContent = "No tasks assigned";
    var nomeUser = document.createElement("h2");
    nomeUser.textContent = user.nome;
    var infoUtilizador = document.createElement("p");
    var userId = document.createElement("p");
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
    var listaDeUtilizadores = document.getElementById("dadosUtilizador");
    listaDeUtilizadores.innerHTML = "";
    var lista = listaUtilizadores;
    if (filterWord) {
        var listaUserSearched = [];
        for (var i = 0; i < listaUtilizadores.length; i++) {
            var palavraMagica = (listaUtilizadores[i].nome).toLowerCase().includes(filterWord);
            if (palavraMagica) {
                listaUserSearched.push(listaUtilizadores[i]);
            }
        }
        lista = listaUserSearched;
    }
    if (filterOrder == true) {
        var listaCopiada = lista.slice();
        var userOrdered = listaCopiada.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
        lista = userOrdered;
    }
    if (filterShowActive == true) {
        var listaUtilizadoresAtivos = lista.filter(function (utilizador) { return utilizador.ativo == true; });
        lista = listaUtilizadoresAtivos;
    }
    for (var i = 0; i < lista.length; i++) {
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
    var span = document.createElement("span");
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
    var btnVerMais = document.createElement("button");
    btnVerMais.textContent = "See more";
    btnVerMais.addEventListener("click", function () { return renderModalUser(user.id); });
    return btnVerMais;
}
function createBtnRemove(user) {
    var btnRemover = document.createElement("button");
    btnRemover.textContent = "Remove";
    btnRemover.addEventListener("click", function () { return removeUsers(user.id); });
    return btnRemover;
}
function createBtnActivateToggle(user) {
    var btnDesativar = document.createElement("button");
    btnDesativar.textContent = "Activate toggle";
    btnDesativar.addEventListener("click", function () {
        switchUserState(user.id);
        renderInactiveUsersBadge();
    });
    return btnDesativar;
}
function switchUserState(identificador) {
    var listaUtilizadorParaDesativar = listaUtilizadores.filter(function (utilizador) { return utilizador.id == identificador; });
    var utilizadorParaDesativar = listaUtilizadorParaDesativar[0];
    //tenho que remover o utilizador do meu array
    if (utilizadorParaDesativar.ativo) {
        utilizadorParaDesativar.ativo = false;
    }
    else {
        utilizadorParaDesativar.ativo = true;
    }
    renderUtilizadores();
}
function createBtnShowActiveUsers() {
    var btnMostrarAtivos = document.getElementById("btnSoAtivos");
    btnMostrarAtivos.addEventListener("click", function () { return renderLoggedInUsers(); });
}
function renderLoggedInUsers() {
    filterShowActive = true;
    renderUtilizadores();
}
function getNewUserFormData() {
    var formNewUser = document.getElementById("formNewUser");
    var inputNome = document.getElementById("nomeUtilizador");
    var inputEmail = document.getElementById("emailUtilizador");
    var array = [];
    formNewUser.addEventListener("submit", function (event) {
        event.preventDefault();
        array = createNewUser(inputNome, inputEmail);
    });
}
function createNewUser(nomeDoUtilizador, emailDoUtilizador) {
    var nome = nomeDoUtilizador.value;
    var email = emailDoUtilizador.value;
    var listaAtb = [];
    listaAtb.push(nome, email);
    var id = Date.now();
    for (var i = 0; i <= 5; i++) {
        id = id + 1;
    }
    var novoUtilizador = new Utilizador(id, nome, email);
    listaUtilizadores.push(novoUtilizador);
    renderUtilizadores();
    return listaAtb;
}
function renderAtiveUsersBadge() {
    var contadorAtivos = document.getElementById("utilizadoresAtivos");
    var listaUtilizadoresAtivos = listaUtilizadores.filter(function (utilizador) { return utilizador.ativo == true; });
    contadorAtivos.textContent = String(listaUtilizadoresAtivos.length);
    return listaUtilizadoresAtivos.length;
}
function renderTotalUsersBadge() {
    var contador = listaUtilizadores.length;
    var badge = document.getElementById("utilizadoresTotais");
    badge.textContent = String(contador);
}
function renderInactiveUsersBadge() {
    var contadorInativos = document.getElementById("utilizadoresInativos");
    var listaUtilizadoresInativos = listaUtilizadores.filter(function (utilizador) { return utilizador.ativo == false; });
    var numContadorInativo = listaUtilizadoresInativos.length;
    contadorInativos.textContent = String(numContadorInativo);
}
function removeUsers(identificador) {
    var listaSemInativos = listaUtilizadores.filter(function (utilizador) { return utilizador.id != identificador; });
    listaUtilizadores = listaSemInativos;
    renderUtilizadores();
}
function createBtnSearch() {
    var inputPesquisa = document.getElementById("pesquisaUtilizadores");
    var btnPesquisa = document.getElementById("pesquisar");
    inputPesquisa.addEventListener("input", function () { return searchUser(inputPesquisa.value); });
}
function searchUser(palavraInserida) {
    filterWord = palavraInserida;
    renderUtilizadores();
}
function renderModalUser(identificador) {
    var user = (listaUtilizadores.filter(function (utilizador) { return utilizador.id == identificador; }))[0];
    var modal = document.getElementById("modalReservas");
    var titulo = document.getElementById("userName");
    titulo.textContent = user.nome;
    var email = document.getElementById("userEmail");
    email.textContent = user.email;
    var toggleState = document.getElementById("userState");
    if (user.ativo) {
        toggleState.textContent = "Utilizador activo";
    }
    else {
        toggleState.textContent = "Utilizador inactivo";
    }
    var startingDate = document.getElementById("userAdesionDate");
    startingDate.textContent = "Utilizador aderiu na data" + String(Date.now());
    modal.classList.add("show");
}
function createBtnCloseModal() {
    var btnFecharModal = document.getElementById("closeModal");
    btnFecharModal.addEventListener("click", function () { return closeModal(); });
}
function closeModal() {
    var modal = document.getElementById("modalReservas");
    modal.classList.remove("show");
}
function renderUserCount() {
    var usersTotal = document.getElementById("statsTotal");
    usersTotal.textContent = "Total of Users: " + String(listaUtilizadores.length) + " (both active and inactive)";
    return listaUtilizadores.length;
}
function renderActiveUsersPercentage() {
    var usersActivePercentage = document.getElementById("activeUsersPercentage");
    var totalAtivos = renderAtiveUsersBadge();
    var totalUsers = renderUserCount();
    var percentage = (totalAtivos / totalUsers) * 100;
    usersActivePercentage.textContent = "Percentage of active users: " + String(percentage.toFixed(2)) + "%";
}
function loadInitialUsers() {
    for (var i = 0; i < InitialUsers.length; i++) {
        var newUser = new Utilizador(InitialUsers[i].id, InitialUsers[i].nome, InitialUsers[i].email);
        listaUtilizadores.push(newUser);
    }
    renderUtilizadores();
}
function createBtnAz() {
    var btnAz = document.getElementById("orderAZ");
    btnAz.addEventListener("click", function () {
        // event.stopPropagation(); 
        orderArray();
    });
}
function orderArray() {
    filterOrder = true;
    renderUtilizadores();
}
function createBtnResetFilter() {
    var btnResetFilters = document.getElementById("btnResetAllFilters");
    btnResetFilters.addEventListener("click", function () { return resetAllFilters(); });
}
function resetAllFilters() {
    filterOrder = false;
    alert(filterOrder);
    filterShowActive = false;
    filterWord = "";
    renderUtilizadores();
}
function renderFilterBtnActiveUsers() {
    var btnMostrarAtivos = document.getElementById("btnSoAtivos");
    if (filterShowActive == true) {
        btnMostrarAtivos.classList.add("filterActive");
    }
    else {
        btnMostrarAtivos.classList.remove("filterActive");
    }
}
function renderFilterBtnOrder() {
    var btnAz = document.getElementById("orderAZ");
    if (filterOrder == true) {
        btnAz.classList.add("filterActive");
    }
    else {
        btnAz.classList.remove("filterActive");
    }
}
function renderDebugData() {
    var debugDiv = document.querySelector("#debug");
    var divTasks = document.createElement("div");
    debugDiv.innerHTML = "";
    for (var i = 0; i < listaUtilizadores.length; i++) {
        var line = document.createElement("div");
        line.textContent = JSON.stringify(listaUtilizadores[i]);
        debugDiv.appendChild(line);
    }
    debugDiv.appendChild(divTasks);
}
