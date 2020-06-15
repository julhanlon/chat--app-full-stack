const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = [
  { name: "Jane", message: "hello" },
  { name: "Tim", message: "hello" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  messages.push(req.body);
  io.emit("message", req.body);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
