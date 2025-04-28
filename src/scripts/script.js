// - Conexión con el servidor
const ws = new WebSocket('ws://localhost:7071')

// - Evento cuando el usuario se conecta al servidor
ws.onopen = () => {
    console.log("Usuario conectado exitosamente")
}

// - Evento cuando el usuario recibe un mensaje del servidor
ws.onmessage = e => {
    // ? Buscamos el contenedor de los mensajes
    const contenedorMensajes = document.querySelector('.contenedor-mensajes')
    // ? Creamos un nuevo div que contendrá el mensaje
    const nuevoMensaje = document.createElement('div')
    // ? Añadimos el nuevo mensaje al contenedor de los mensajes
    contenedorMensajes.appendChild(nuevoMensaje)
    // ? Añadimos la respuesta del servidor al nuevo mensaje
    nuevoMensaje.innerHTML += e.data
}

// - Evento cuando el usuario se desconecta del servido
ws.onclose = () => {
    console.log("Usuario desconectado exitosamente")
}

// - Le asignamos el evento onclick al botón de enviar
document.getElementById('enviar').onclick = () => {
    // ? Obtenemos el input que tiene el mensaje
    const mensaje = document.getElementById('mensaje')
    if (!mensaje.value || mensaje.value === '') {
        alert("No puedes enviar un mensaje vacío")
        return
    }
    // ? Enviamos el mensaje al servidor
    ws.send(mensaje.value)
    // ? Limpiamos el input 
    mensaje.value = ''
}