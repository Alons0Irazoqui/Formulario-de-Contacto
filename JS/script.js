//Evento para que cargen todos los documentos del html
document.addEventListener("DOMContentLoaded", () => {
    //Creando el objeto de Email con la informacion
    const email = {
        name: "",
        email: "",
        subject: "",
        message: ""
    }

//Seleccionando los elementos del DOM
const formulario = document.getElementById("formulario");
const inputEmail = document.querySelector("#email");
const inputMensaje = document.querySelector("#message");
const inputNombre = document.querySelector("#name");
const inputTitulo = document.querySelector("#subject");
const btnSubmit = document.querySelector("#submit");
const btnReset = document.querySelector("#buttonReset");
const spinner = document.querySelector(".loader")

//Cargando los elementos del dom
cargarEventos();

function cargarEventos(){

    //Eventos de los inputs
    inputNombre.addEventListener("input", validarFormulario);
    inputEmail.addEventListener("input", validarFormulario);
    inputTitulo.addEventListener("input", validarFormulario);
    inputMensaje.addEventListener("input", validarFormulario);

    btnReset.addEventListener("click", e => {
        e.preventDefault();

        formulario.reset();

        email.email = "";
        email.name = "";
        email.message = "";
        email.subject = "";
        validarBoton();
    })

    //Al enviar el formulario
    formulario.addEventListener("submit", enviarFormulario);

}

//Funcion al enviar el formulario
function enviarFormulario(e){
    e.preventDefault();
    console.log("enviando...")

    spinner.classList.remove("hidden"); //Mostrando el spinner al momento de enviar el formulario

    
    setTimeout(() => {
        spinner.classList.add("hidden"); 

        formulario.reset();
        //Vaciando el objeto
        email.email = "";
        email.message = "";
        email.name = "";
        email.subject = "";
        validarBoton();


        //Creando la alerta de exito
        const alertaExito = document.createElement("p");
        alertaExito.textContent = "Formulario enviado correctamente";
        alertaExito.classList.add("w-full", "bg-green-200", "text-green-800", "text-center", "p-3", "rounded-lg", "shadow-md");

        formulario.appendChild(alertaExito);

        setTimeout(() => {

            formulario.reset = HTMLFormElement.prototype.reset;

            alertaExito.remove();
            
        },2500)

    }, 2500);

}

//Funcion para validar el formulario
function validarFormulario(e){
    //Validando el boton
    validarBoton();

    //Validando si el campo esta vacio o no
    if(e.target.value.trim() === ""){

        //Actualizando el objeto a ""
        email[e.target.id] = "";
        validarBoton()
        crearAlertaDinamica("Este campo es obligatorio", e.target.parentElement);
        return;
    }

    if(e.target.id === "email"){
        validarEmail(e);
        return;
    }

    email[e.target.id] = e.target.value;

    //En caso de que los campos esten llenos y correctos
    eliminarAlerta(e.target.parentElement);

}

//Validando el email
function validarEmail(evento){
    //Expresion regular para validar un email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validar = regexEmail.test(evento.target.value);
    
    if(validar){
        email[evento.target.id] = evento.target.value;
        eliminarAlerta(evento.target.parentElement);
        return;

    }
    
    email[evento.target.id] = "";
    validarBoton();
    crearAlertaDinamica("El email proporcionado no es valido", evento.target.parentElement);
}

//Creando la alerta dinamica con el mensaje;
function crearAlertaDinamica(mensaje, padre){

    //Eliminar alerta
    eliminarAlerta(padre);

    //Creando la alerta
    const alerta = document.createElement("p");
    alerta.textContent = mensaje;
    alerta.classList.add("alerta","w-full", "bg-red-500", "text-white", "text-center", "p-3", "rounded-lg", "shadow-md");
    
    //Agregando la alerta al input
    padre.appendChild(alerta);

}

//Eliminando la alerta
function eliminarAlerta(divInput){
    const elemento = divInput.querySelector(".alerta");
    if(elemento){
        elemento.remove();
    }
    return;
}

//Validando el boton
function validarBoton(){
    const valores = Object.values(email);
    
    if(valores.includes("")){
        btnSubmit.classList.add("opacity-50");
        btnSubmit.disabled = true;
        return;
    }

    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
}






















})