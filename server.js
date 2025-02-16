const express = require('express');
const dbConnect = require("./config/connectDB");
require("dotenv").config();
const cors = require('cors');
const swagger = require('./swagger');

const userRouter = require("./routes/users");
const recipeRouter = require("./routes/recipes");
const ingredientRouter = require("./routes/ingredients");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// connect DB
dbConnect();

const app = express();

app.use(express.json());
app.use(cors());

swagger(app);

app.listen(PORT, HOST, () => {
    console.log(`listening on PORT: ${PORT}`);
});

// body parser middleware
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/ingredients", ingredientRouter);
app.use("/api/auth", authRouter);
