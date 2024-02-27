const express = require("express")
const app = express();
const http = require("http").createServer(app)
const path = require("path");
const { Socket } = require("socket.io");

const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve("./public")))

//socket 
const io = require("socket.io")(http)

io.on("connection", (socket) => {
    console.log("connected...")
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg)
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

http.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`)
})