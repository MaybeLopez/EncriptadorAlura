let botonEncriptar = document.getElementById("button_encrypt");
let botonDesencriptar = document.getElementById("button_decrypt");
let botonCopiar = document.getElementById("button_copiar");
let botones = document.getElementsByClassName("button");
let textoEntrada = document.getElementById("input_text_encrypt");
let textoSalida = document.getElementById("output_text_decrypt");
let cuerpo = document.querySelector('body');
let contenedorPadre = document.querySelector(".result");

function habilitarBotones() {
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
    
}

function habilitarCopiado() {
    botonCopiar.disabled = false;
}

function actualizarPagina() {
    if(textoEntrada.value !== ""){
        contenedorPadre.classList.remove("no_texto")
    }
    textoEntrada.focus();
}
function myAlert(message) {//mensaje modificado de alerta
    var alert = document.getElementById('custom-alert');
    alert.innerHTML = message;
    alert.style.display = 'block';
    setTimeout(function() {
      alert.style.display = 'none';
    }, 2000); // Oculta el alert después de 3 segundos
}
function focusTextArea() {
    var textarea = document.getElementById("input_text_encrypt");
    textarea.focus();
}
function encriptarMensaje() {
  if (textoEntrada.value != "") {
    // expresión regular para verificar minúsculas y espacios
    let regExp = /^[a-z\s]+$/;

    if (regExp.test(textoEntrada.value)) {
      let mensajeEncriptado = textoEntrada.value;
      mensajeEncriptado = mensajeEncriptado.replace(/e/gim, "enter");
      mensajeEncriptado = mensajeEncriptado.replace(/i/gim, "imes");
      mensajeEncriptado = mensajeEncriptado.replace(/a/gim, "ai");
      mensajeEncriptado = mensajeEncriptado.replace(/o/gim, "ober");
      mensajeEncriptado = mensajeEncriptado.replace(/u/gim, "ufat");
      textoSalida.innerHTML = mensajeEncriptado;
      textoSalida.value = mensajeEncriptado;
      actualizarPagina();
    } else {
      myAlert("Por favor escribe un texto válido, solo letras minúsculas y espacios.");
      focusTextArea();
    }
  } else {
    myAlert("Por favor escribe un texto");
    focusTextArea();
  }
}


function desencriptarMensaje() {
    if (textoEntrada.value != "") {
        let mensajeDesencriptado = textoEntrada.value;
        mensajeDesencriptado = mensajeDesencriptado.replace(/enter/gim, "e");
        mensajeDesencriptado = mensajeDesencriptado.replace(/imes/gim, "i");
        mensajeDesencriptado = mensajeDesencriptado.replace(/ai/gim, "a");
        mensajeDesencriptado = mensajeDesencriptado.replace(/ober/gim, "o");
        mensajeDesencriptado = mensajeDesencriptado.replace(/ufat/gim, "u");
        textoSalida.innerHTML = mensajeDesencriptado;
        textoSalida.value = mensajeDesencriptado;
        actualizarPagina();
    }
    else {
        myAlert("Para desencriptar un mensaje, usa la caja de texto");
        focusTextArea();
    }
}

function copiarMensaje() {
    if (textoSalida.value != "") {
        navigator.clipboard.writeText(textoSalida.value);
        myAlert("Mensaje copiado");
    }
    else {
        myAlert("Nada que copiar");
    }
}

//--script del formulario--//

const form = document.getElementById("my_form");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto.

    const formData = new FormData(form); // Recopila los datos del formulario.

    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
        Accept: "application/json",
        },
    }); // Envía los datos del formulario a la URL del formulario.

    if (response.ok) {
        myAlert("¡Gracias por enviar tu consulta!"); // Mensaje de confirmación.
        form.reset();//vacia el formulario
    } 
    else {
        myAlert("Ha ocurrido un error al enviar el formulario."); // Mensaje de error.
    }
});



botonEncriptar.onclick = encriptarMensaje;
botonDesencriptar.onclick = desencriptarMensaje;
botonCopiar.onclick = copiarMensaje;
textoEntrada.onclick = habilitarBotones;