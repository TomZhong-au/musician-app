const express = require("express");
const path = require("path");
const store = require("./store/datastore");
const initialStoreData = require("./store/data");
const Musician = require("./models/musician");
const musicianRoutes = require("./routes/musician");

const app = express();
const port = process.env.PORT || 3001;

// include routes
app.use("/musician", musicianRoutes);

app.use(express.static("public"));

// Index route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("/health", (req, res) => {
  res.status(200).send("a healthy server");
});

app.get("/env", (req, res) => {
  res.status(200).send(`
  the environment variable is ${
    process.env.key1 ? process.env.key1 : "NOT AVAILABLE"
  }
  `);
});

// initialize store
const musician = new Musician(store);
musician.initStore(initialStoreData);
app.locals.musician = musician;

// start server
const server = app.listen(port, () => {
  console.log("Server started on port " + port);
});

module.exports = server;
