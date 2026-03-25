let tempoRestante = 7 * 60 * 1000; // 7 minutos
let msVisual = 0;

const timer = setInterval(() => {
    if (tempoRestante <= 0) {
        clearInterval(timer);

        const titulo = document.querySelector("#cronometro .titulo");
        if (titulo) titulo.remove();

        const tempo = document.getElementById('tempo');
        if (tempo) {
            tempo.textContent = "OFERTA QUASE ESGOTADA!";
            tempo.classList.add("piscar");
        }

        return;
    }

    let minutos = Math.floor(tempoRestante / 60000);
    let segundos = Math.floor((tempoRestante % 60000) / 1000);

    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    msVisual = (msVisual + 1) % 31;
    let msText = msVisual < 10 ? '0' + msVisual : msVisual;

    const tempoEl = document.getElementById('tempo');
    if (tempoEl) {
        tempoEl.textContent = `${minutos}:${segundos}:${msText}`;
    }

    tempoRestante -= 33;
}, 33);

// ================= COPIAR ID =================
function copiarID(codigo, botao) {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(codigo)
        .then(() => {
            botao.innerText = "Copiado!";
            setTimeout(() => {
                botao.innerText = "Copiar";
            }, 1500);
        });
}

// ================= OVERLAY =================
window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay-tiktok");

  // só mostra se nunca viu
  if (overlay && !localStorage.getItem("overlayVisto")) {
    overlay.classList.add("active");
  }
});

// CONTINUAR NO SITE
function continuarOverlay() {
  const overlay = document.getElementById("overlay-tiktok");

  if (overlay) {
    overlay.classList.remove("active");
    localStorage.setItem("overlayVisto", "true");
  }
}

// ABRIR NAVEGADOR EXTERNO
function abrirFora() {
  const url = window.location.href;

  if (/Android/i.test(navigator.userAgent)) {
    let clean = url.replace(/^https?:\/\//, '');
    window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
  } else {
    alert("Abra este site no navegador externo para melhor experiência!");
  }
}

// FECHAR CLICANDO FORA
function fecharSeFora(event) {
  const box = document.querySelector("#overlay-tiktok .box");

  if (box && !box.contains(event.target)) {
    continuarOverlay();
  }
}