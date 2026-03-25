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
    
    // Captura a identidade do navegador
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // Detecção ultra-robusta de navegadores internos (In-App Browsers)
    // Verifica TikTok, Instagram, FB Messenger e outros
    const isInApp = /TikTok|musical_ly|FBAN|FBAV|Instagram|Snapchat/i.test(ua);

    // LOG PARA TESTE (Opcional): 
    // Se você estiver com o celular no PC, isso ajuda a ver o que o site lê
    console.log("Navegador detectado:", ua);

    // Só mostra se for um App E se o usuário ainda não fechou
    if (isInApp && overlay && !localStorage.getItem("overlayVisto")) {
        overlay.classList.add("active");
        overlay.style.display = "flex"; 
    } else {
        // Se não for app, remove o overlay para não pesar a página
        if (overlay && !overlay.classList.contains("active")) {
            overlay.remove();
        }
    }

    // Detecta o sistema para o CSS
    if (/Android/i.test(ua)) {
        document.body.classList.add("is-android");
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
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