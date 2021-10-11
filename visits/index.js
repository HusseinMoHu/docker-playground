const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
  host: "redis-server",
  post: 6379,
});
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (error, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
