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
function abrirFora(event) {
    // 1. Impede qualquer comportamento padrão (como recarregar a página)
    if (event) event.preventDefault();

    // 2. Seleciona o botão principal
    const btn = document.querySelector(".btn-principal");

    if (btn) {
        // 3. Muda o texto do botão para o Passo 1 e 2
        // Usamos \n para quebrar a linha se o seu CSS permitir (white-space: pre-wrap)
        btn.innerHTML = "PASSO 1: Clique nos (⋮) no topo <br> PASSO 2: 'Abrir no Navegador'";
        
        // 4. Ajustes estéticos para o texto caber e ficar em destaque
        btn.style.height = "auto";          // Ajusta a altura se o texto for grande
        btn.style.padding = "15px 10px";    // Dá mais espaço interno
        btn.style.fontSize = "0.85rem";     // Diminui um pouco a letra para caber tudo
        btn.style.lineHeight = "1.4";       // Espaçamento entre as linhas do passo 1 e 2
        btn.style.background = "#111";      // Fundo escuro para destacar o novo texto
        btn.style.border = "2px solid #0088ff"; // Borda azul vibrante
        btn.style.color = "#fff";
        
        // 5. Desativa o clique para o usuário não ficar apertando e resetando
        btn.style.pointerEvents = "none"; 
    }

    // Opcional: Manter o Android automático porque lá funciona sem erro
    if (/Android/i.test(navigator.userAgent)) {
        const url = window.location.href;
        let clean = url.replace(/^https?:\/\//, '');
        window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
    }
}

function fecharSeFora(event) {
    const box = document.querySelector("#overlay-tiktok .box");
    if (box && !box.contains(event.target)) {
        continuarOverlay();
    }
}