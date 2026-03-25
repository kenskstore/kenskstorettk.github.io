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
            const originalText = botao.innerText;
            botao.innerText = "Copiado! ✓";
            botao.style.background = "#28a745"; // Fica verde ao copiar
            setTimeout(() => {
                botao.innerText = originalText;
                botao.style.background = ""; // Volta ao normal
            }, 1500);
        });
}

// ================= OVERLAY =================
window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay-tiktok");
    if (overlay && !localStorage.getItem("overlayVisto")) {
        overlay.classList.add("active");
    }
});

function continuarOverlay() {
    const overlay = document.getElementById("overlay-tiktok");
    if (overlay) {
        overlay.classList.remove("active");
        localStorage.setItem("overlayVisto", "true");
    }
}

// ================= ABRIR NAVEGADOR (CONSERTADO) =================
function abrirFora() {
    const url = window.location.href;

    // Se for ANDROID
    if (/Android/i.test(navigator.userAgent)) {
        let clean = url.replace(/^https?:\/\//, '');
        window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
    } 
    // Se for IPHONE (iOS)
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // REMOVI O ALERT (que causava o erro visual)
        // No iOS, a melhor forma é abrir a URL em uma nova aba
        // Isso dispara a sugestão nativa de "Abrir no Safari" do Instagram/TikTok
        window.open(url, '_blank');
        
        // Opcional: Avisar o usuário no próprio botão antes dele sumir
        const btn = document.querySelector(".btn-principal"); // ajuste conforme sua classe
        if(btn) btn.innerText = "Clique em 'Abrir' no topo ↑";
    } 
    // Outros casos
    else {
        window.open(url, '_blank');
    }
}

function fecharSeFora(event) {
    const box = document.querySelector("#overlay-tiktok .box");
    if (box && !box.contains(event.target)) {
        continuarOverlay();
    }
}