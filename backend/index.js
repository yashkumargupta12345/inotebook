const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const PORT = 3000;
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/Auth", require("./routes/auth"))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})