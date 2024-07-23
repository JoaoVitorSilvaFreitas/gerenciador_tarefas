const formularioAdicionarTarefa = document.querySelector('.container_adiciona-task-input');
const botaoAdicionarTarefa = document.querySelector('.container_adiciona-task-botao');
const botaoRemoverTodas = document.querySelector('#botao_remover_todos');
const tarefasLocalStorage = localStorage.getItem('lista');
const listaCompleta = document.querySelector('.lista_tasks');

let listaDeItens = [];

function adicionarNovaTarefa() {

    if (formularioAdicionarTarefa.value === '') {
        alert('O campo está vazio !!!')
    } else {
        listaDeItens.push({
            tarefa: formularioAdicionarTarefa.value,
            concluida: false,
        });
        mostrarTarefa();
    }

}

function editarTarefa(posicao){
    const novaDescricao = prompt ("Qual o novo nome da tarefa ?");
    console.log('nova descrição da tarefa: '+novaDescricao);
    if(novaDescricao){
        listaDeItens[posicao].tarefa = novaDescricao;
        mostrarTarefa();
    }
}

function mostrarTarefa() {
    let novaLi = '';
    
    if (Array.isArray(listaDeItens) && listaDeItens.length >= 0) {

        listaDeItens.forEach((item, posicao) => {
            novaLi = novaLi + `
        <li class="linha_task ${item.concluida && "finalizada"}">
        <img class="img_task img-checked" src="./imagens/checked.png" alt="check-tarefa"
        onclick="concluirTarefa(${posicao})">
        <p class="item_task-nome-tarefa">${item.tarefa}</p>
        <div>
        <img class="img_task img-edit" src="./imagens/edit.png" alt="editar-tarefa"
        onclick="editarTarefa(${posicao})">
        <img class="img_task img-delete" src="./imagens/trash.png" alt="deletar-tarefa" onclick="deletarTarefa(${posicao})">
        </div>
        </li>
        `
        });
    }else {
        console.error("A lista está vazia")
    }

    listaCompleta.innerHTML = novaLi;
    localStorage.setItem('lista', JSON.stringify(listaDeItens));
    formularioAdicionarTarefa.value = '';
}

function concluirTarefa(posicao) {
    listaDeItens[posicao].concluida = !listaDeItens[posicao].concluida;
    mostrarTarefa();
}

function deletarTarefa(posicao) {
    listaDeItens.splice(posicao, 1);
    mostrarTarefa();
}

function deletarTudo(posicao) {
    listaDeItens.splice(0, 25);
    mostrarTarefa();
}

function recarregarTarefas() {
    if (tarefasLocalStorage) {
        listaDeItens = JSON.parse(tarefasLocalStorage);
        mostrarTarefa();
    }
}

recarregarTarefas();

botaoAdicionarTarefa.addEventListener('click', adicionarNovaTarefa);
botaoRemoverTodas.addEventListener('click', deletarTudo);