const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const PORT = 6000;
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/Auth", require("./routes/auth"))
app.use("/api/Notes", require("./routes/notes"))

app.listen(PORT, () => {
    console.log(`Server Backend is running on port ${PORT}`);
})