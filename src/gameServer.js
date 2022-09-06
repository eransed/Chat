


// const ws = require("ws")
// const PORT = 5679
// const wss = new ws.WebSocketServer({
//   port: PORT,
// })

// function init() {
//   wss.on("connection", function connection(ws) {

//     ws.on("message", function message(data) {
    
//     })
    
//   })

// }


function rawBroadcast(users, obj) {
  for (let user of users) {
    user.sock.send(JSON.stringify(obj))
  }
}

function handleGameState(obj, sock, users) {
  if (obj.gameStateMessage) {
    sock.send(JSON.stringify())
    return true
  }
}


module.exports.handleGameState = handleGameState


