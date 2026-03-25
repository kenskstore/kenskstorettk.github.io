let tempoRestante = 7 * 60 * 1000; // 10 minutos
let msVisual = 0;

const timer = setInterval(() => {
    if (tempoRestante <= 0) {
        clearInterval(timer);

        // Remove o título antigo
        const titulo = document.querySelector("#cronometro .titulo");
        if (titulo) titulo.remove();

        // Atualiza o contador para a mensagem final
        const tempo = document.getElementById('tempo');
        tempo.textContent = "OFERTA QUASE ESGOTADA!";
        tempo.classList.add("piscar"); // adiciona a classe que faz piscar
        return;
    }

    let minutos = Math.floor(tempoRestante / 60000);
    let segundos = Math.floor((tempoRestante % 60000) / 1000);

    minutos = minutos < 10 ? '0'+minutos : minutos;
    segundos = segundos < 10 ? '0'+segundos : segundos;

    msVisual = (msVisual + 1) % 31;
    let msText = msVisual < 10 ? '0'+msVisual : msVisual;

    document.getElementById('tempo').textContent = `${minutos}:${segundos}:${msText}`;

    tempoRestante -= 33;
}, 33);

function copiarID(codigo, botao) {
    navigator.clipboard.writeText(codigo)
        .then(() => {
            botao.innerText = "Copiado!";
            setTimeout(() => {
                botao.innerText = "Copiar";
            }, 1500);
        });
}


function continuarTikTok() {
    const overlay = document.getElementById("overlay-tiktok");
    if (overlay) overlay.style.display = "none";
}

// ================= OVERLAY =================
window.addEventListener("DOMContentLoaded", () => {
    mostrarOverlay(); // mostra o overlay assim que a página carrega
});

function mostrarOverlay() {
    const overlay = document.getElementById("overlay-tiktok");
    if (overlay) {
        overlay.style.display = "flex";   // deixa visível
        overlay.style.opacity = "1";      // garante transição suave
    }
}

function continuarOverlay() {
    const overlay = document.getElementById("overlay-tiktok");
    if (overlay) {
        overlay.style.opacity = "0";      // fade out
        setTimeout(() => {
            overlay.style.display = "none"; // depois de sumir, retira do fluxo
        }, 300); // tempo deve bater com a transição CSS
    }
}

// botão "Abrir navegador externo" (vai redirecionar e nem mostra o site)
function abrirFora() {
    const url = window.location.href;
    if (/Android/i.test(navigator.userAgent)) {
        let clean = url.replace(/^https?:\/\//, '');
        window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
    } else {
        alert("Abra este site no navegador para a melhor experiência!");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay-tiktok");
    if (overlay) overlay.classList.add("active");
});

function continuarOverlay() {
    const overlay = document.getElementById("overlay-tiktok");
    if (overlay) overlay.classList.remove("active");
}