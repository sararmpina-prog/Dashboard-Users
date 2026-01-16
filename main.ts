

interface UtilizadorInterface {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
}



class Utilizador implements UtilizadorInterface {
  id: number;
  nome: string;
  email: string;
  ativo: boolean = true;

  constructor(id: number, nome: string, email: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
  }
  desativar() {
    this.ativo = false;
  }
}



let listaUtilizadores: Utilizador[] = [];



getNewUserFormData(); 
loadUsers(); 
renderUtilizadores(listaUtilizadores);
createBtnShowActiveUsers(); 
createBtnSearch();
createBtnCloseModal(); 
createBtnAz (); 


function renderUserCard(user: Utilizador) {

    let elementoLista = document.createElement("li") as HTMLLIElement;
    elementoLista.setAttribute("class", "userCard"); 

    let containerUtilizador = document.createElement("div") as HTMLDivElement;
    containerUtilizador.setAttribute("class", "containerPai")

    let containerTarefas = document.createElement("div") as HTMLDivElement;
    containerTarefas.textContent = "No tasks assigned";

    let nomeUser = document.createElement("h2") as HTMLHeadingElement; 
    nomeUser.textContent = user.nome; 

    let infoUtilizador = document.createElement("p") as HTMLParagraphElement;

    let userId = document.createElement("p") as HTMLParagraphElement;
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


function renderUtilizadores(lista: Utilizador[]) {
  let listaDeUtilizadores = document.getElementById("dadosUtilizador" ) as HTMLUListElement;
  listaDeUtilizadores.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    listaDeUtilizadores.appendChild(renderUserCard(lista[i]))
  }

  
  renderTotalUsersBadge(); 
  renderAtiveUsersBadge();
  renderUserCount();
  renderActiveUsersPercentage();  
}


function addLogInState(user: Utilizador) {
    let span = document.createElement("span") as HTMLSpanElement; 

    if (user.ativo == true) {
      span.textContent = " Logged in";
      span.classList.add("activo");
    } else {
      span.textContent = " Logged out";
      span.classList.add("desativo");
    }

    return span; 
}


function createBtnSeeMore (user: Utilizador) {
    let btnVerMais = document.createElement("button") as HTMLButtonElement; 

    btnVerMais.textContent = "See more"; 

    btnVerMais.addEventListener("click", () => renderModalUser(user.id)); 

    return btnVerMais; 
}

function createBtnRemove(user: Utilizador) {

    let btnRemover = document.createElement("button") as HTMLButtonElement; 
  
    btnRemover.textContent = "Remove"; 

    btnRemover.addEventListener("click", () => removeUsers(user.id)); 

    return btnRemover; 
}


function createBtnActivateToggle (user: Utilizador) {
    
    let btnDesativar = document.createElement("button") as HTMLButtonElement;

    btnDesativar.textContent = "Activate toggle";

    btnDesativar.addEventListener("click", () => {
    switchUserState(user.id);
    renderInactiveUsersBadge(); 
    }); 
      
    return btnDesativar; 
}

function switchUserState(identificador: number) {
 
  let utilizadorParaDesativar  = (listaUtilizadores.filter((utilizador) => utilizador.id == identificador))[0];

  if (utilizadorParaDesativar.ativo) {
    utilizadorParaDesativar.ativo = false;
  } else {
    utilizadorParaDesativar.ativo = true;
  }

  renderUtilizadores(listaUtilizadores);
}



function createBtnShowActiveUsers () {
   
  let btnMostrarAtivos = document.getElementById("btnSoAtivos") as HTMLButtonElement;
 
  btnMostrarAtivos.addEventListener("click", () => renderLoggedInUsers());
}

function renderLoggedInUsers() {

  let listaUtilizadoresAtivos = listaUtilizadores.filter((utilizador) => utilizador.ativo == true);

  renderUtilizadores(listaUtilizadoresAtivos);
}




function getNewUserFormData() {
  
  let formNewUser = document.getElementById("formNewUser") as HTMLFormElement; 

  let inputNome = document.getElementById("nomeUtilizador") as HTMLInputElement;

  let inputEmail = document.getElementById("emailUtilizador") as HTMLInputElement;
 
  let array: string[] = []; 

  formNewUser.addEventListener("submit", (event) =>{
    
    event.preventDefault();
    array = createNewUser(inputNome, inputEmail);
   
  })
 
}


function createNewUser(nomeDoUtilizador: HTMLInputElement, emailDoUtilizador: HTMLInputElement) {
 
  let nome: string = nomeDoUtilizador.value;
  let email: string = emailDoUtilizador.value;

  let listaAtb: string [] = [];
  listaAtb.push(nome, email); 

  let id: number = Date.now(); 

  for (let i = 0; i<=5; i++) {
    id = id + 1; 
  } 
  let novoUtilizador = new Utilizador(id, nome, email);

  listaUtilizadores.push(novoUtilizador);

  renderUtilizadores(listaUtilizadores);

  return listaAtb; 
}


function renderAtiveUsersBadge () {
  let contadorAtivos = document.getElementById("utilizadoresAtivos") as HTMLSpanElement; 

   let listaUtilizadoresAtivos = listaUtilizadores.filter(
    (utilizador) => utilizador.ativo == true
  );

  contadorAtivos.textContent = String(listaUtilizadoresAtivos.length); 

  return listaUtilizadoresAtivos.length; 
}


function renderTotalUsersBadge() {
  let contador = listaUtilizadores.length;
  let badge = document.getElementById("utilizadoresTotais") as HTMLSpanElement;

  badge.textContent = String(contador);
}



function renderInactiveUsersBadge () {
  let contadorInativos = document.getElementById("utilizadoresInativos") as HTMLSpanElement; 

  let listaUtilizadoresInativos = listaUtilizadores.filter(utilizador => utilizador.ativo == false
  );

  let numContadorInativo = listaUtilizadoresInativos.length

  contadorInativos.textContent = String(numContadorInativo); 
}
  





function removeUsers (identificador: number) {
   let listaSemInativos = listaUtilizadores.filter(utilizador => utilizador.id != identificador); 

   listaUtilizadores = listaSemInativos; 

  renderUtilizadores(listaUtilizadores); 
}



function createBtnSearch() {
  let inputPesquisa = document.getElementById("pesquisaUtilizadores") as HTMLInputElement;

  let btnPesquisa = document.getElementById("pesquisar") as HTMLButtonElement;

  inputPesquisa.addEventListener("input", () => searchUser(inputPesquisa.value))
}



function searchUser (palavraInserida: string) { 

  let listaUserSearched: Utilizador[] = []; 

  for (let i=0; i < listaUtilizadores.length; i++) {
    let palavraMagica = (listaUtilizadores[i].nome).toLowerCase().includes(palavraInserida); 
      if (palavraMagica) {
        listaUserSearched.push(listaUtilizadores[i]); 
      }
  }

  renderUtilizadores(listaUserSearched); 
}



function renderModalUser(identificador: number) {
  let user = (listaUtilizadores.filter(utilizador => utilizador.id == identificador))[0]; 

  let modal = document.getElementById("modalReservas") as HTMLDivElement; 

  let titulo = document.getElementById("userName") as HTMLHeadingElement; 
  titulo.textContent = user.nome
  
  let email = document.getElementById("userEmail") as HTMLParagraphElement; 
  email.textContent = user.email

  let toggleState = document.getElementById("userState") as HTMLParagraphElement;
  if (user.ativo) {
    toggleState.textContent = "Utilizador activo"; 
  } else {
    toggleState.textContent = "Utilizador inactivo"; 
  }
  
  
  let startingDate = document.getElementById("userAdesionDate") as HTMLParagraphElement; 
  startingDate.textContent = "Utilizador aderiu na data" + String(Date.now()); 

  modal.classList.add("show"); 
  
}


function createBtnCloseModal() {

  let btnFecharModal = document.getElementById("closeModal") as HTMLButtonElement;  

  btnFecharModal.addEventListener("click", () => closeModal()); 
}



function closeModal() {
    let modal = document.getElementById("modalReservas") as HTMLDivElement; 

    modal.classList.remove("show"); 
}




function renderUserCount() {

    let usersTotal = document.getElementById("statsTotal") as HTMLParagraphElement; 
    usersTotal.textContent = "Total of Users: " + String(listaUtilizadores.length) + " (both active and inactive)"

    return listaUtilizadores.length
}



function renderActiveUsersPercentage() {
    let usersActivePercentage = document.getElementById("activeUsersPercentage") as HTMLParagraphElement; 

    let totalAtivos: number = renderAtiveUsersBadge(); 

    let totalUsers: number  = renderUserCount();

    let percentage: number = (totalAtivos/totalUsers)*100; 

    usersActivePercentage.textContent = "Percentage of active users: " + String(percentage.toFixed(2)) + "%"; 

}


function loadUsers() {

  // let listaNewUser = 
  // console.log(listaNewUser); 

 let biaGuerreiro = new Utilizador(Date.now(), "Beatriz Guerreiro", "bialarag@gmail.com");

  let greicelleSilva = new Utilizador(Date.now() + 1, "Greicelle Silva", "greicellesilva@gmail.com");

  listaUtilizadores.push(biaGuerreiro, greicelleSilva);

}


function createBtnAz () {
  let btnAz = document.getElementById("orderAZ") as HTMLButtonElement;

  btnAz.addEventListener("click", (event) => {
    event.stopPropagation(); 
    orderArray()
  }); 
}

function orderArray () {
  
  let userOrdered = listaUtilizadores.sort((a,b) => a.nome.localeCompare(b.nome))

  renderUtilizadores(userOrdered); 
}
 

