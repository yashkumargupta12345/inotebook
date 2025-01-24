const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    console.log("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})