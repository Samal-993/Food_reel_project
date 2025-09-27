//Create a server

const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes= require('./routes/food.routes')
const foodPartnerRoutes = require("./routes/food-partner.routes")
const cors = require('cors')
const app = express();



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send("Helow World")
})
app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
app.use("/api/food-partner", foodPartnerRoutes);

app.get("/api/auth/check-login", (req, res) => {
  if (req.cookies.token) {
    // optionally verify token using JWT
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});


module.exports = app;

