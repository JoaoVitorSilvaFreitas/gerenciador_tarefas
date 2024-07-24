//declaração das constantes do projeto
const formularioAdicionarTarefa = document.querySelector('.container_adiciona-task-input');
const botaoAdicionarTarefa = document.querySelector('.container_adiciona-task-botao');
const botaoRemoverTodas = document.querySelector('#botao_remover_todos');
const tarefasLocalStorage = localStorage.getItem('lista');
const listaCompleta = document.querySelector('.lista_tasks');
// Criação da lista variavel vázia.
let listaDeItens = [];

//função de criar o novo item dentro do array.
function mostrarTarefa() {
    //cria-se uma nova linha vazia:
    let novaLi = '';
    // Se o array lista de itens for um array e também ele for maior que zero
    // a lista de itens vai criar uma nova linha com os parâmetros passados. 
    if (Array.isArray(listaDeItens) && listaDeItens.length >= 0) {

        listaDeItens.forEach((item, posicao) => {
            novaLi = novaLi + `
        <li class="linha_task ${item.concluida && "marcada"}">
        <img class="img_task img-checked" src="./imagens/checked.png" alt="check-tarefa"
        onclick="concluirTarefa(${posicao})">
        <p class="item_task-nome-tarefa">${item.tarefa}</p>
        <div class="item_task-container-imagens-direita">
        <img class="img_task img-edit" src="./imagens/edit.png" alt="editar-tarefa"
        onclick="editarTarefa(${posicao})">
        <img class="img_task img-delete" src="./imagens/trash.png" alt="deletar-tarefa" onclick="deletarTarefa(${posicao})">
        </div>
        </li>
        `
        });
        // caso ela estiver nula, um erro vai acontecer 
    } else {
        console.error("A lista está vazia")
    }

    // a lista completa vai receber o item dentro dela dinamicamente, recebendo o que o ususario está passando
    listaCompleta.innerHTML = novaLi;
    //o local storage vai converter os itens da listas para string e mandar para lá
    localStorage.setItem('lista', JSON.stringify(listaDeItens));
    // o formulário será resetado 
    formularioAdicionarTarefa.value = '';
}

    // função que adiciona a nova tarefa ao formulário principal
function adicionarNovaTarefa() {
    // verifica se o valor do formulário é igual a zero e exibe um alerta de erro
    if (formularioAdicionarTarefa.value === '') {
        alert('O campo está vazio !!!')
    // verifica se o tamanho da lista é maior ou = a 10 e exibe um alerta 
    } else if (listaDeItens.length >= 10) {
        alert('Não é possivel adicionar mais tarefas')
    // Caso a informação esteja dentro dos parâmetros passados ela cria a lista de itens com uma tarefa e se ela está concluida ou não.
    } else {
        listaDeItens.push({
            tarefa: formularioAdicionarTarefa.value,
            concluida: false,
        });
        mostrarTarefa();
    }
}

    // função que edita a tarefa a partir do valor inserido no prompt
function editarTarefa(posicao) {
    const novaDescricao = prompt("Qual o novo nome da tarefa ?");
    // verifica se a nova descrição não é nula
    if (novaDescricao) {
    // a lista de item verifica dentro do array a posição junto com a tarefa, e recebe a nova descrição
        listaDeItens[posicao].tarefa = novaDescricao;
        mostrarTarefa();
    }
}

//conluir a tarefa, verificando a posição está concluida e apenas altera o estado do botao de true para false.
function concluirTarefa(posicao) {
    listaDeItens[posicao].concluida = !listaDeItens[posicao].concluida;
    mostrarTarefa();
}

//deleta o item, utilizando o splice, que pega a posição dentro do array, e o segundo parâmetro que seria a quantidade de itens a serem excluidos.
function deletarTarefa(posicao) {
    listaDeItens.splice(posicao, 1);
    mostrarTarefa();
}

function deletarTudo(posicao) {
    listaDeItens.splice(0, 25);
    mostrarTarefa();
}

//recarrega as tarefas sempre que a página for carregada, o if dentro, serve para garantir que a lista não está nula. Caso esteja, dará um erro na criação da linha dentro do array.
function recarregarTarefas() {
    if (tarefasLocalStorage) {
        listaDeItens = JSON.parse(tarefasLocalStorage);
        mostrarTarefa();
    }
}

recarregarTarefas();

botaoAdicionarTarefa.addEventListener('click', adicionarNovaTarefa);
botaoRemoverTodas.addEventListener('click', deletarTudo);