// Fecha evento (AJUSTAR si corresponde)
const fechaEvento = new Date("August 22, 2026 21:00:00").getTime();

// ===== COUNTDOWN =====
function startCountdown() {
  function update() {
    const now = Date.now();
    const diff = fechaEvento - now;

    if (diff <= 0) {
      ["dias", "horas", "minutos", "segundos"].forEach(id => {
        document.getElementById(id).innerText = "00";
      });
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    document.getElementById("dias").innerText = String(dias).padStart(2, "0");
    document.getElementById("horas").innerText = String(horas).padStart(2, "0");
    document.getElementById("minutos").innerText = String(minutos).padStart(2, "0");
    document.getElementById("segundos").innerText = String(segundos).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

startCountdown();


// ===== TODO LO DEMÁS DESPUÉS QUE CARGA EL DOM =====
document.addEventListener("DOMContentLoaded", () => {

  // === COPIAR ALIAS ===
  const copyBtn = document.getElementById("copyAlias");
  if (copyBtn) {
    const alias = "COBRE.BUTACA.NOVIO";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(alias)
        .then(() => {
          copyBtn.textContent = "¡Copiado!";
          setTimeout(() => copyBtn.textContent = "Copiar alias", 2000);
        })
        .catch(() => alert("No se pudo copiar. Copialo manualmente."));
    });
  }

  // === PLAY / PAUSE MÚSICA ===
  const bgMusic = document.getElementById("bgMusic");
  const playBtn = document.getElementById("playMusic");

  if (bgMusic && playBtn) {
    playBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        playBtn.textContent = "⏸ Pause";
      } else {
        bgMusic.pause();
        playBtn.textContent = "▶ Play";
      }
    });
  }

  // === CONFIRMAR WHATSAPP ===
  const confirmBtn = document.getElementById("confirmWhats");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const text = encodeURIComponent(
        "Hola! Confirmo asistencia a los 15 de Sofía Belén Ruiz Moreno. Mi nombre es: "
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    });
  }

  // === MAILTO ===
  const mailInput = document.getElementById("mailInput");
  const saveMail = document.getElementById("saveMail");
  const mailtoBtn = document.getElementById("mailtoBtn");

  function updateMailto() {
    const mail = localStorage.getItem("invitacion_mail") || "";
    const subject = encodeURIComponent("Comprobante de pago - Tarjetita Sofía Belén");
    const body = encodeURIComponent(
      "Adjunto comprobante de pago.\n\nNombre:\nImporte:\nAlias MP: COBRE.BUTACA.NOVIO\n\nGracias!"
    );

    if (mail) {
      mailtoBtn.href = `mailto:${mail}?subject=${subject}&body=${body}`;
      mailtoBtn.classList.remove("disabled");
    } else {
      mailtoBtn.href = "#";
      mailtoBtn.classList.add("disabled");
    }
  }

  if (saveMail) {
    saveMail.addEventListener("click", () => {
      const email = mailInput.value.trim();
      if (!email.includes("@")) {
        alert("Ingresá un email válido");
        return;
      }
      localStorage.setItem("invitacion_mail", email);
      alert("Mail guardado: " + email);
      updateMailto();
    });
  }

  updateMailto();
});
