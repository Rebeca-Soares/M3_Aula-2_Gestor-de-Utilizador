"use strict";
//Exercício 2
class UserClass {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = true; //inicia como ativo
    }
    disable() {
        this.active = false;
    }
    toggleState() {
        this.active = !this.active;
    }
}
//Exercício 3
let UserList = [
    new UserClass(1, 'Rebeca Cerqueira', 'rsc@gmail.com'),
    new UserClass(2, 'Ana Garcia', 'acg@gmail.com'),
    new UserClass(3, 'Leandro Nogueira', 'lmg@gmail.com')
];
//Exercício 4, 5 e 10
const listDiv = document.querySelector('.UsersList');
const contadorSpan = document.getElementById('contador');
const nomeInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const addBnt = document.getElementById('addBnt');
const info = document.getElementById('information');
const filterActives = document.getElementById('filterActives');
const filterDesactive = document.getElementById('filterDesactive');
const contadorDesactiveSpan = document.getElementById('contadorDesactive');
const contadorTotalUsers = document.getElementById('contadorTotalUsers');
const contadorPercentagemUsers = document.getElementById('contadorPercentagemUsers');
// criar div de detalhes
const userDetailsDiv = document.createElement('div');
userDetailsDiv.className = 'user-details'; // classe para estilização
userDetailsDiv.style.display = 'none'; // começa escondido
document.body.appendChild(userDetailsDiv); // adiciona ao DOM
const filtersDiv = document.getElementById('filter');
filtersDiv.insertAdjacentElement('afterend', userDetailsDiv);
// Exercicio 19
const fakeData = [
    { id: 1, name: 'Paulo Coelho', email: 'pmc@gmail.com', active: true },
    { id: 2, name: 'Joana pinto', email: 'jpn@gmail.com', active: false },
    { id: 3, name: 'Caio Lacerda', email: 'clgg@gmail.com', active: true }
];
fakeData.forEach(d => {
    const user = new UserClass(d.id, d.name, d.email);
    user.active = d.active;
    UserList.push(user);
});
renderUsers();
function renderUsers(users = UserList) {
    listDiv.innerHTML = '';
    users.forEach(u => {
        const card = document.createElement('div');
        card.className = 'card';
        const state = u.active ? 'Ativo' : 'Inativo';
        const color = u.active ? 'green' : 'red';
        card.innerHTML = `
            <p><i class="bi bi-person"></i> <strong>Nome:</strong> ${u.name}</p>
            <p><i class="bi bi-envelope"></i> <strong>Email:</strong> ${u.email}</p>
            <p>
            <i class="bi bi-circle-fill" style="color:${color}; font-size:10px;"></i>
            <strong style="color: ${color}">${state}</strong>
            </p>
            <p><i class="bi bi-list-task"></i> <strong>Tarefas:</strong> 0 tarefas atribuídas</p>
            <button class="toggleStateBnt" data-id='${u.id}'>
            ${u.active ? 'Desativar' : 'Ativar'}
            </button>
            <button class="removeUser" data-id='${u.id}'>
            <i class="bi bi-person-x"></i> Remover</button>
        `;
        // Exercicio 11 part 1
        /*         const btn = card.querySelector('.disableBtn') as HTMLButtonElement;
                btn.addEventListener('click', () => {
                    Userdisable(u.id);
                }); */
        const removeBnt = card.querySelector('.removeUser');
        removeBnt.addEventListener('click', () => {
            removeUser(u.id);
        });
        //Exercicio 14
        const toggleBnt = card.querySelector('.toggleStateBnt');
        toggleBnt.addEventListener('click', () => {
            u.toggleState();
            renderUsers();
        });
        card.addEventListener('click', () => {
            console.log('clice card', u.name);
            showUserDetails(u);
        });
        listDiv.appendChild(card);
    });
    contadorSpan.textContent = UserList.filter(u => u.active).length.toString();
    // Exercicio 18
    contadorTotalUsers.textContent = UserList.length.toString();
    const total = users.length;
    const ativos = users.filter(u => u.active).length;
    const percentagem = total > 0 ? (ativos / total) * 100 : 0;
    contadorPercentagemUsers.textContent = percentagem.toFixed(0) + '%';
}
//Exercicio 6
addBnt.addEventListener('click', () => {
    const nome = nomeInput.value;
    const email = emailInput.value;
    if (!nome || !email) {
        info.textContent = 'Preencha todos os campos!';
        info.style.color = 'red';
        return;
    }
    else if (!email.includes('@')) {
        info.textContent = 'Email inválido';
        info.style.color = 'red';
        return;
    }
    const newUser = new UserClass(UserList.length + 1, nome, email);
    UserList.push(newUser);
    info.textContent = 'Usuário adicionado com sucesso!';
    info.style.color = 'green';
    nomeInput.value = '';
    emailInput.value = '';
    renderUsers();
});
//Exercício 7
function Userdisable(id) {
    const user = UserList.find(u => u.id === id);
    if (user) {
        user.disable();
        renderUsers();
    }
}
//Exercício 8
filterActives.addEventListener('click', () => {
    const actives = UserList.filter(u => u.active);
    renderUsers(actives);
});
//Exercício 9
contadorSpan.textContent = UserList.filter(u => u.active).length.toString();
// Exercicio 11 part 2
function removeUser(id) {
    UserList = UserList.filter(u => u.id !== id);
    renderUsers();
}
//Exercicio 12
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredUsers = UserList.filter(u => u.name.toLowerCase().includes(query));
    if (filteredUsers.length === 0) {
        listDiv.innerHTML = `<p>Usuario não encontrado </p>`;
    }
    else {
        renderUsers(filteredUsers);
    }
});
//Exercicio 13
filterDesactive.addEventListener('click', () => {
    const desactives = UserList.filter(u => u.active === false);
    renderUsers(desactives);
});
contadorDesactiveSpan.textContent = UserList.filter(u => !u.active).length.toString();
//Exercicio 15
const orderName = document.getElementById('orderName');
orderName.addEventListener('click', () => {
    UserList.sort((a, b) => a.name.localeCompare(b.name));
    renderUsers();
});
function showUserDetails(user) {
    userDetailsDiv.style.display = 'block';
    userDetailsDiv.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Status:</strong> ${user.active ? 'Ativo' : 'Inativo'}</p>
        <p><strong>Tarefas Atribuidas:</strong> 0</p>
    `;
}
renderUsers();
