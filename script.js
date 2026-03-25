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
            botao.style.background = "#28a745"; 
            setTimeout(() => {
                botao.innerText = originalText;
                botao.style.background = ""; 
            }, 1500);
        });
}

// ================= OVERLAY =================
window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay-tiktok");
    
    // Detecta se o navegador é o do TikTok
    const isTikTok = /TikTok/i.test(navigator.userAgent);

    // Só mostra se for TikTok E se o usuário ainda não fechou nesta sessão
    if (isTikTok && overlay && !localStorage.getItem("overlayVisto")) {
        overlay.classList.add("active");
        overlay.style.display = "flex"; // Garante que ele apareça
    } else {
        // Se não for TikTok, remove o overlay do caminho
        if (overlay) overlay.remove(); 
    }

    // Detecta o sistema para o CSS (como fizemos antes)
    if (/Android/i.test(navigator.userAgent)) {
        document.body.classList.add("is-android");
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        document.body.classList.add("is-ios");
    }
});

// ================= ABRIR NAVEGADOR (PLANO B) =================
function abrirFora() {
    const url = window.location.href;

    // Se for ANDROID
    if (/Android/i.test(navigator.userAgent)) {
        let clean = url.replace(/^https?:\/\//, '');
        window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
        return;
    } 

    // Se for IPHONE / TIKTOK / INSTAGRAM
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Feedback visual focado no PLANO B (instruir o usuário)
    const btn = document.querySelector(".btn-principal");
    if (btn) {
        btn.innerText = "Siga o passo 1 e 2 acima ↑";
        btn.style.background = "#333";
        btn.style.color = "#0088ff";
    }
}

function fecharSeFora(event) {
    const box = document.querySelector("#overlay-tiktok .box");
    if (box && !box.contains(event.target)) {
        continuarOverlay();
    }
}