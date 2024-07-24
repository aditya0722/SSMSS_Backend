const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Ensure correct path for routes
const login_routes = require("./routers/login");
const register_route=require("./routers/register");
const store_route=require("./routers/store")
const cors =require("cors")
const acountRoute=require("./routers/accountRouter")
// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("this is working");
});

// Correct path for different routes
app.use("/api/login", login_routes);
app.use("/api",register_route);
app.use("/api",store_route);
app.use("/api",acountRoute)


app.listen(PORT, () => {
    console.log("listening to", PORT);
});

