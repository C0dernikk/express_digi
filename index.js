import 'dotenv/config'
import express from "express";

const app = express();
const port = process.env.PORT || 8000;

// app.get('/', (req, res) => {
//     res.send('Hello from Nikhil!')
// })

// app.get('/ice-tea', (req, res) => {
//     res.send('What ice tea would you prefer?')
// })

// app.get('/twitter', (req, res) => {
//     res.send('nikhilkatwitter')
// })

app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea); // 201 is used for post method, this means request of adding new user or adding resource is succeeded
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//Update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  if (name) {
    tea.name = name;
  }

  if (price) {
    tea.price = price;
  }

  res.status(200).send(tea);
});

//Delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("Deleted"); //When the client doesn’t need any data back, just confirmation
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}...`);
});
