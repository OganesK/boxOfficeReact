const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: '*',
}

const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extend: false}));
app.use(express.json());

app.get("/home", (req, res) => {
    res.json({
        name:"Bill",
        age: 25
    });
});

app.listen(PORT, () => console.log("Server is up"));