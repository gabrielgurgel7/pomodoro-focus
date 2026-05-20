/* Botões */
const btnAddTarefa = document.querySelector(".app__button--add-task");
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const btnDeletar = document.querySelector(".app__form-footer__button--delete");
const btnRemoverConcluidas = document.querySelector("#btn-remover-concluidas");
const btnRemoverTodas = document.querySelector("#btn-remover-todas");

/* Formulário */
const formAddTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");

/* Lista de tarefas */
const ulTarefas = document.querySelector(".app__section-task-list");
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

/* Descrição da tarefa selecionada */
const paragrafoDescricaoTarefa = document.querySelector(
  ".app__section-active-task-description",
);

/* Função que salva e persiste tarefas */
function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

/* Função que cria o elemento HTML para cada tarefa */
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
  imgBotao.setAttribute("src", "imagens/edit.png"); /* Pinta o quadro */
  /* Insere a imagem dentro do botão */
  botao.append(imgBotao); /* Coloca o quadro na parede */

  li.append(svg); /* Aqui é a mesma coisa -> coloca o svg dentro de li */
  li.append(paragrafo);
  li.append(botao);

  if (tarefa.completa) {
    li.classList.add("app__section-task-list-item-complete");
    botao.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item")
        .forEach((el) => {
          el.classList.remove("app__section-task-list-item-active");
        });
      if (tarefaSelecionada === tarefa) {
        paragrafoDescricaoTarefa.textContent = "";
        tarefaSelecionada = null;
        liTarefaSelecionada = null;
        return;
      }
      tarefaSelecionada = tarefa;
      liTarefaSelecionada = li;
      paragrafoDescricaoTarefa.textContent = tarefa.descricao;

      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}

/* Escuta o click no ESC do teclado e fecha o formulário */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    formAddTarefa.reset();
    formAddTarefa.classList.add("hidden");
  }
});

/* Abre e fecha o formulário */
btnAddTarefa.addEventListener("click", () => {
  formAddTarefa.classList.toggle("hidden");
});

/* Deleta o conteúdo do formulário */
btnDeletar.addEventListener("click", () => {
  textArea.value = "";
});

/* Cancela a adição de tarefa e fecha o formulário */
btnCancelar.addEventListener("click", () => {
  formAddTarefa.reset();
  formAddTarefa.classList.add("hidden");
});

/* Adiciona uma nova tarefa */
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

/* Cria os elementos de tarefa */
tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
});

/* Evento Customizado */
document.addEventListener("focoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
    tarefaSelecionada.completa = true;
    atualizarTarefas();
  }
});

/* Remove todas as tarefas */
const removerTarefas = (somenteCompletas) => {
  const seletor = somenteCompletas
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(seletor).forEach((el) => {
    el.remove();
  });
  tarefas = somenteCompletas
    ? tarefas.filter((tarefa) => !tarefa.completa)
    : [];
  atualizarTarefas();
};

btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);
