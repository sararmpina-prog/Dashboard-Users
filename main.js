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
var listaUtilizadores = [];
getNewUserFormData();
loadUsers();
renderUtilizadores(listaUtilizadores);
createBtnShowActiveUsers();
createBtnSearch();
createBtnCloseModal();
function renderUserCard(user) {
    var elementoLista = document.createElement("li");
    elementoLista.setAttribute("class", "userCard");
    var containerUtilizador = document.createElement("div");
    containerUtilizador.setAttribute("class", "containerPai");
    var containerTarefas = document.createElement("div");
    containerTarefas.textContent = "0 tarefas atribuídas";
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
// function renderUser() {
//   let lista: Utilizador[] = listaUtilizadores; 
//   if (filterUsers == true) {
//       lista =listaUtilizadores.filter((utilizador) => utilizador.ativo == true);
//   } 
//   let listaDeUtilizadores = document.getElementById("dadosUtilizador" ) as HTMLUListElement;
//   listaDeUtilizadores.innerHTML = "";
//   for (let i = 0; i < lista.length; i++) {
//     listaDeUtilizadores.appendChild(renderUserCard(lista[i]))
//   }
//   badgeUtilizadores();
//   badgeAtivos(); 
//   usersTotalStats();
//   activeUsersPercentage() 
// }
function renderUtilizadores(lista) {
    var listaDeUtilizadores = document.getElementById("dadosUtilizador");
    listaDeUtilizadores.innerHTML = "";
    for (var i = 0; i < lista.length; i++) {
        listaDeUtilizadores.appendChild(renderUserCard(lista[i]));
    }
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
    var utilizadorParaDesativar = (listaUtilizadores.filter(function (utilizador) { return utilizador.id == identificador; }))[0];
    if (utilizadorParaDesativar.ativo) {
        utilizadorParaDesativar.ativo = false;
    }
    else {
        utilizadorParaDesativar.ativo = true;
    }
    renderUtilizadores(listaUtilizadores);
}
function createBtnShowActiveUsers() {
    var btnMostrarAtivos = document.getElementById("btnSoAtivos");
    btnMostrarAtivos.addEventListener("click", function () { return renderLoggedInUsers(); });
}
function renderLoggedInUsers() {
    var listaUtilizadoresAtivos = listaUtilizadores.filter(function (utilizador) { return utilizador.ativo == true; });
    renderUtilizadores(listaUtilizadoresAtivos);
}
function getNewUserFormData() {
    var formNewUser = document.getElementById("formNewUser");
    var inputNome = document.getElementById("nomeUtilizador");
    var inputEmail = document.getElementById("emailUtilizador");
    formNewUser.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Olá github");
        createNewUser(inputNome, inputEmail);
    });
}
function createNewUser(nomeDoUtilizador, emailDoUtilizador) {
    var nome = nomeDoUtilizador.value;
    var email = emailDoUtilizador.value;
    var novoUtilizador = new Utilizador(Date.now(), nome, email);
    listaUtilizadores.push(novoUtilizador);
    renderUtilizadores(listaUtilizadores);
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
    renderUtilizadores(listaUtilizadores);
}
function createBtnSearch() {
    var inputPesquisa = document.getElementById("pesquisaUtilizadores");
    var btnPesquisa = document.getElementById("pesquisar");
    inputPesquisa.addEventListener("input", function () { return searchUser(inputPesquisa.value); });
}
function searchUser(palavraInserida) {
    var listaUserSearched = [];
    for (var i = 0; i < listaUtilizadores.length; i++) {
        var palavraMagica = (listaUtilizadores[i].nome).toLowerCase().includes(palavraInserida);
        if (palavraMagica) {
            listaUserSearched.push(listaUtilizadores[i]);
        }
    }
    renderUtilizadores(listaUserSearched);
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
    usersActivePercentage.textContent = "Percentage of active users: " + String(percentage) + "%";
}
function loadUsers() {
    var biaGuerreiro = new Utilizador(1, "Beatriz Guerreiro", "bialarag@gmail.com");
    var greicelleSilva = new Utilizador(2, "Greicelle Silva", "greicellesilva@gmail.com");
    listaUtilizadores.push(biaGuerreiro, greicelleSilva);
}
