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
let listaUtilizadores = [];
getNewUserFormData();
loadUsers();
renderUtilizadores(listaUtilizadores);
createBtnShowActiveUsers();
createBtnSearch();
createBtnCloseModal();
createBtnAz();
function renderUserCard(user) {
    let elementoLista = document.createElement("li");
    elementoLista.setAttribute("class", "userCard");
    let containerUtilizador = document.createElement("div");
    containerUtilizador.setAttribute("class", "containerPai");
    let containerTarefas = document.createElement("div");
    containerTarefas.textContent = "0 tarefas atribuídas";
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
    let listaDeUtilizadores = document.getElementById("dadosUtilizador");
    listaDeUtilizadores.innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
        listaDeUtilizadores.appendChild(renderUserCard(lista[i]));
    }
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
    let utilizadorParaDesativar = (listaUtilizadores.filter((utilizador) => utilizador.id == identificador))[0];
    if (utilizadorParaDesativar.ativo) {
        utilizadorParaDesativar.ativo = false;
    }
    else {
        utilizadorParaDesativar.ativo = true;
    }
    renderUtilizadores(listaUtilizadores);
}
function createBtnShowActiveUsers() {
    let btnMostrarAtivos = document.getElementById("btnSoAtivos");
    btnMostrarAtivos.addEventListener("click", () => renderLoggedInUsers());
}
function renderLoggedInUsers() {
    let listaUtilizadoresAtivos = listaUtilizadores.filter((utilizador) => utilizador.ativo == true);
    renderUtilizadores(listaUtilizadoresAtivos);
}
function getNewUserFormData() {
    let formNewUser = document.getElementById("formNewUser");
    let inputNome = document.getElementById("nomeUtilizador");
    let inputEmail = document.getElementById("emailUtilizador");
    formNewUser.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Olá github");
        createNewUser(inputNome, inputEmail);
    });
}
function createNewUser(nomeDoUtilizador, emailDoUtilizador) {
    let nome = nomeDoUtilizador.value;
    let email = emailDoUtilizador.value;
    let novoUtilizador = new Utilizador(Date.now(), nome, email);
    listaUtilizadores.push(novoUtilizador);
    renderUtilizadores(listaUtilizadores);
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
    renderUtilizadores(listaUtilizadores);
}
function createBtnSearch() {
    let inputPesquisa = document.getElementById("pesquisaUtilizadores");
    let btnPesquisa = document.getElementById("pesquisar");
    inputPesquisa.addEventListener("input", () => searchUser(inputPesquisa.value));
}
function searchUser(palavraInserida) {
    let listaUserSearched = [];
    for (let i = 0; i < listaUtilizadores.length; i++) {
        let palavraMagica = (listaUtilizadores[i].nome).toLowerCase().includes(palavraInserida);
        if (palavraMagica) {
            listaUserSearched.push(listaUtilizadores[i]);
        }
    }
    renderUtilizadores(listaUserSearched);
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
        toggleState.textContent = "Utilizador activo";
    }
    else {
        toggleState.textContent = "Utilizador inactivo";
    }
    let startingDate = document.getElementById("userAdesionDate");
    startingDate.textContent = "Utilizador aderiu na data" + String(Date.now());
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
    usersTotal.textContent = "Total of Users: " + String(listaUtilizadores.length) + " (both active and inactive)";
    return listaUtilizadores.length;
}
function renderActiveUsersPercentage() {
    let usersActivePercentage = document.getElementById("activeUsersPercentage");
    let totalAtivos = renderAtiveUsersBadge();
    let totalUsers = renderUserCount();
    let percentage = (totalAtivos / totalUsers) * 100;
    usersActivePercentage.textContent = "Percentage of active users: " + String(percentage) + "%";
}
function loadUsers() {
    let biaGuerreiro = new Utilizador(1, "Beatriz Guerreiro", "bialarag@gmail.com");
    let greicelleSilva = new Utilizador(2, "Greicelle Silva", "greicellesilva@gmail.com");
    listaUtilizadores.push(biaGuerreiro, greicelleSilva);
}
function createBtnAz() {
    let btnAz = document.getElementById("orderAZ");
    btnAz.addEventListener("click", (event) => {
        event.stopPropagation();
        orderArray();
    });
}
function orderArray() {
    let userOrdered = listaUtilizadores.sort((a, b) => a.nome.localeCompare(b.nome));
    renderUtilizadores(userOrdered);
}
