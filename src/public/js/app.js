//app.js
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nicknameForm = document.querySelector("#nickname");
const socket = new WebSocket(`wss://${window.location.host}`);

function Addlist(msg) {
  const li = document.createElement("li");
  li.innerText = msg.data;
  messageList.append(li);
}

function makeMessage(type, text) {
  const msg = { type, text };
  return JSON.stringify(msg);
}

function msg(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  const Text = input.value;
  input.value = "";
  socket.send(makeMessage("msg", Text));
}

function nick(event) {
  event.preventDefault();
  messageForm.classList.remove("hidden");
  messageList.classList.remove("hidden");
  nicknameForm.classList.add("hidden");

  const input = nicknameForm.querySelector("input");
  const Text = input.value;
  input.value = "";

  socket.send(makeMessage("nick", Text));
}

messageForm.addEventListener("submit", msg);
nicknameForm.addEventListener("submit", nick);
socket.addEventListener("message", Addlist);
