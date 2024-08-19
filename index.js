const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Ensure correct path for routes
const login_routes = require("./routers/login");
const register_route=require("./routers/register");
const store_route=require("./routers/store")
const cors =require("cors");
const acountRoute=require("./routers/accountRouter")
const blogRoute=require("./routers/blog")
const bodyParser = require('body-parser');
const receiptdata=require('./routers/receipt');
const AttandanceAndFee=require('./routers/AttendanceFee');
const background =require("./routers/background")
// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.get("/", (req, res) => {
    res.send("this is working");
});

// Correct path for different routes
app.use("/api/login", login_routes);
app.use("/api",register_route);
app.use("/api",store_route);
app.use("/api",acountRoute);
app.use("/api",blogRoute);
app.use("/api",receiptdata);
app.use("/api",AttandanceAndFee);
app.use("/api",background)



app.listen(PORT, () => {
    console.log("listening to", PORT);
});

