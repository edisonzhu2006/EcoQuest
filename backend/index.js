const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const Item = require('./models/item.model.js');
const ItemRoute = require('./routes/item.route.js');
const UserRoute = require('./routes/user.route.js');
const dailyRoutes = require("./routes/dailytask.route");
const weeklyRoutes = require("./routes/weeklytask.route");
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/items", ItemRoute);
app.use("/api/users", UserRoute);
app.use("/api/dailytasks", dailyRoutes);
app.use("/api/weeklytasks", weeklyRoutes);

app.listen(3000, () => {console.log('Server is running on port 3000')
});

mongoose.connect('mongodb+srv://ez2103:WQtgiFLH4aYBtCZw@backend.pv7daup.mongodb.net/Backend?retryWrites=true&w=majority&appName=Backend', {
})
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});
