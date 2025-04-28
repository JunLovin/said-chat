const { v4: uuidv4 } = require('uuid')
const { WebSocketServer, WebSocket } = require('ws')

// - Creo una nuevo servidor WebSocket con el puerto 7071
// ? Las urls de los servidores de websocktes suelen ser ws://localhost:(puerto) cuando corren en local
const servidor = new WebSocketServer({
    port: 7071
})

// - Creo un nuevo Set que contendrá los usuarios conectados
const usuarios = new Set()

// - Cuando un usuario se conecte al servidor, se ejecutará la función callback
servidor.on('connection', (socket) => {
    // ? Le agrego al usuario un id único para poder identificarlo dentro del chat
    socket.id = uuidv4()
    // ? Agrego el usuario al Set de usuarios conectados y envio un mensaje en consola
    usuarios.add(socket)
    console.log("Usuario conectado exitosamente")

    // ? Evento cuando el usuario (socket actual) envía un mensaje al servidor
    // ! Es importante que el socket (el usuario) el evento y no servidor porque el usuario es el que enviará el mensaje, no el servidor.
    // ! servidor.on('message', (mensaje) => {}) ESTO NO
    socket.on('message', (mensaje) => {
        // ? Recorro el Set de usuarios conectados
        usuarios.forEach(usuario => {
            // ? Si el usuario está conectado, envía el mensaje a todos los usuarios conectados
            if (usuario.readyState === WebSocket.OPEN) {
                usuario.send(`
                    <div class="flex flex-col gap-4">
                        <span class="usuario-id font-extrabold flex">Usuario: ${usuario.id}</span><span class="mensaje-usuario bg-white px-4 py-1 text-black rounded-full">${mensaje}</span>
                    </div>`)
            }
        })
    })

    // ? Evento cuando el usuario se desconecta del servidor
    socket.on('close', () => {
        // ? Elimino al usuario del Set de usuarios conectados y envio un mensaje en consola
        usuarios.delete(socket)
        console.log("Usuario desconectado exitosamente")
    })
})

// - Evento para manejar errores en el servidor
servidor.on('error', (error) => {
    console.log("Error en el servidor: " + error)
})

// - Evento cuando el servidor empieza a escuchar
servidor.on('listening', () =>{ 
    console.log("Servidor escuchando en ws://localhost:7071")
})