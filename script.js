/* ELEMENTOS DA PÁGINA */
const html = document.querySelector("html");
const temporizador = document.querySelector("#timer");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");

/* BOTÕES */
const botoes = document.querySelectorAll(".app__card-button");
const btnStartPause = document.querySelector("#start-pause");
const btnStartPauseText = document.querySelector("#start-pause span");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnDescansoCurto = document.querySelector(".app__card-button--curto");
const btnDescansoLongo = document.querySelector(".app__card-button--longo");

/* MÚSICAS */
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
musica.loop = true;
const musicaPlay = new Audio("sons/play.wav");
const musicaPause = new Audio("sons/pause.mp3");
const musicaBeep = new Audio("sons/beep.mp3");

/* ÍCONES */
const iconePlayPause = document.querySelector(".app__card-primary-butto-icon");

/* TEMPORIZADOR */
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

/* FUNÇÕES EVENTO DE CLICK */
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

btnFoco.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  btnFoco.classList.add("active");
});

btnDescansoCurto.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  btnDescansoCurto.classList.add("active");
});

btnDescansoLongo.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  btnDescansoLongo.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

/* FUNÇÕES TEMPORIZADOR */
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    musicaBeep.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

btnStartPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    musicaPause.play();
    return;
  }
  musicaPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  btnStartPauseText.textContent = "Pausar";
  iconePlayPause.setAttribute("src", `imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloId);
  btnStartPauseText.textContent = "Começar";
  iconePlayPause.setAttribute("src", `imagens/play_arrow.png`);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
