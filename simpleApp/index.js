const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi there!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up and running in port ${port}`);
});
