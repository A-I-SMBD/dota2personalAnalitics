import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.post("/", (req, res) => {
  console.log(`Handled POST`)
  console.log(req.body)
  res.status(200).send("OK");  // Отправляем подтверждение
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log('Dota 2 GSI listening on port ' + server.address().port);
});
