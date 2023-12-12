//server.js

import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`Listening on https://4v4tkf-3000.csb.app/`);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const DB = [];
//------------------------------------------------------------//
function onSocketClose() {
  console.log("Disconnected from the Browser");
}

function onSocketMessage(message) {
  console.log(message.toString());
}

wss.on("connection", (socket) => {
  DB.push(socket);
  socket["nick"] = "익명";
  console.log("Connected to Browser 😘");
  socket.on("close", onSocketClose);

  socket.on("message", (message) => {
    const msg = JSON.parse(message);
    switch (msg.type) {
      case "msg":
        DB.forEach((Asocket) => {
          Asocket.send(`${socket.nick}: ${msg.text}`);
        });
        break;
      case "nick":
        socket.nick = msg.text;
        break;
    }
  });
});

server.listen(3000, handleListen);
