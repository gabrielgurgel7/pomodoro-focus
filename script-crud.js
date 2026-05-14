const btnAddTarefa = document.querySelector(".app__button--add-task");
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const btbDeletar = document.querySelector(".app__form-footer__button--delete");

const formAddTarefa = document.querySelector(".app__form-add-task");

const textArea = document.querySelector(".app__form-textarea");

const ulTarefas = document.querySelector(".app__section-task-list");

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

/* Função que salva e persiste tarefas */
function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
  /* Cria o elemento li */
  const li = document.createElement("li");
  /* Adiciona essa classe ao li */
  li.classList.add("app__section-task-list-item");

  /* Cria o SVG ✅ */
  const svg = document.createElement("svg");
  svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
      <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
  `;

  /* Cria o elemento p */
  const paragrafo = document.createElement("p");
  paragrafo.textContent = tarefa.descricao;
  paragrafo.classList.add("app__section-task-list-item-description");

  /* Cria botão de edição */
  const botao = document.createElement("button");
  /* Adiciona essa classe ao botão */
  botao.classList.add("app_button-edit");

  /* Função para editar tarefa (atualiza na Local Storage)  */
  botao.onclick = () => {
    // debugger;
    const novaDescricao = prompt("Qual é o novo nome da tarefa?");
    // console.log("Nova descrição da tarefa: ", novaDescricao);
    if (novaDescricao) {
      paragrafo.textContent = novaDescricao;
      tarefa.descricao = novaDescricao;
      atualizarTarefas();
    } else return;
  };

  /* Imagem do botão de edição */
  const imgBotao =
    document.createElement("img"); /* Fabrica o quadro em branco */
  /* Atribui o diretório da imagem ao atributo src do */
  imgBotao.setAttribute("src", "/imagens/edit.png"); /* Pinta o quadro */
  /* Insere a imagem dentro do botão */
  botao.append(imgBotao); /* Coloca o quadro na parede */

  li.append(svg); /* Aqui é a mesma coisa -> coloca o svg dentro de li */
  li.append(paragrafo);
  li.append(botao);

  return li;
}

btnAddTarefa.addEventListener("click", () => {
  formAddTarefa.classList.toggle("hidden");
});

btbDeletar.addEventListener("click", () => {
  textArea.value = "";
});

btnCancelar.addEventListener("click", () => {
  textArea.value = "";
  formAddTarefa.classList.add("hidden");
});

formAddTarefa.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarefa = {
    descricao: textArea.value,
  };
  tarefas.push(tarefa);
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
  atualizarTarefas();
  textArea.value = "";
  formAddTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
});
