const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const PORT = 6000;
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/Auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(PORT, () => {
    console.log(`Server Backend is running on port ${PORT}`);
})