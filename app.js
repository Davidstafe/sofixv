// Fecha evento (AJUSTAR si corresponde)
const fechaEvento = new Date("August 22, 2026 21:00:00").getTime();

// Countdown
function startCountdown(){
  function update(){
    const now = Date.now();
    const diff = fechaEvento - now;
    if(diff <= 0){
      document.getElementById("dias").innerText = "00";
      document.getElementById("horas").innerText = "00";
      document.getElementById("minutos").innerText = "00";
      document.getElementById("segundos").innerText = "00";
      return;
    }
    const dias = Math.floor(diff / (1000*60*60*24));
    const horas = Math.floor((diff / (1000*60*60)) % 24);
    const minutos = Math.floor((diff / (1000*60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);
    document.getElementById("dias").innerText = String(dias).padStart(2,"0");
    document.getElementById("horas").innerText = String(horas).padStart(2,"0");
    document.getElementById("minutos").innerText = String(minutos).padStart(2,"0");
    document.getElementById("segundos").innerText = String(segundos).padStart(2,"0");
  }
  update();
  setInterval(update,1000);
}
startCountdown();



// Mercado Pago alias copy
document.getElementById("copyAlias").addEventListener("click", ()=>{
  const alias = "COBRE.BUTACA.NOVIO";
  navigator.clipboard?.writeText(alias).then(()=> {
    alert("Alias copiado: " + alias);
  }).catch(()=>{ alert("No se pudo copiar. Copialo manualmente: " + alias); });
});

// Open Mercado Pago (generic link — podés reemplazar por link directo si lo tenés)
document.getElementById("openMP").addEventListener("click",(e)=>{
  // deja que el enlace abra la página de Mercado Pago en nueva pestaña
});

// Play / pause music
const bg = document.getElementById("bgMusic");
const playBtn = document.getElementById("playMusic");
playBtn.addEventListener("click", ()=>{
  if(bg.paused) { bg.play(); playBtn.innerText = "Pausar"; }
  else { bg.pause(); playBtn.innerText = "Play"; }
});

// Confirmar por WhatsApp (abrir chat con mensaje)
document.getElementById("confirmWhats").addEventListener("click",(e)=>{
  e.preventDefault();
  const phone = ""; // si preferís, podés poner número de confirmación aquí
  const text = encodeURIComponent("Hola! Confirmo asistencia a los 15 de Sofía Belén Ruiz Moreno. Mi nombre es: ");
  const url = phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
  window.open(url,"_blank");
});

// Mailto: guardar mail y abrir cliente
const mailInput = document.getElementById("mailInput");
const saveMail = document.getElementById("saveMail");
const mailtoBtn = document.getElementById("mailtoBtn");
let storedMail = ""; // se guarda en memoria; si querés persistir, usar localStorage

saveMail.addEventListener("click", ()=>{
  const v = mailInput.value.trim();
  if(!v || !v.includes("@")) { alert("Ingresá un email válido"); return; }
  storedMail = v;
  localStorage.setItem("invitacion_mail", storedMail);
  alert("Mail guardado: " + storedMail);
  updateMailto();
});

function updateMailto(){
  const mail = localStorage.getItem("invitacion_mail") || storedMail || "";
  const subject = encodeURIComponent("Comprobante de pago - Tarjetita Sofía Belén");
  const body = encodeURIComponent("Adjunto comprobante de pago.\n\nNombre:\nImporte:\nAlias MP: COBRE.BUTACA.NOVIO\n\nGracias!");
  if(mail){
    mailtoBtn.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    mailtoBtn.classList.remove("disabled");
  } else {
    mailtoBtn.href = "#";
    mailtoBtn.classList.add("disabled");
    mailtoBtn.addEventListener("click", ()=> alert("Guardá primero el mail donde querés recibir el comprobante."));
  }
}
updateMailto();
document.addEventListener("DOMContentLoaded", () => {

  // === COPIAR ALIAS ===
  const copyBtn = document.getElementById("copyAlias");
  const alias = "COBRE.BUTACA.NOVIO";

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(alias)
        .then(() => {
          copyBtn.textContent = "¡Copiado!";
          setTimeout(() => {
            copyBtn.textContent = "Copiar alias";
          }, 2000);
        })
        .catch(() => {
          alert("No se pudo copiar. Copialo manualmente.");
        });
    });
  }

});
