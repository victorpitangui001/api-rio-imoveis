const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();

// Config JSON response
app.use(express.json());

// Solve Cors
app.use(cors({credentials: true, origin:'https://front-rio-imoveis.vercel.app'}));

// Public folder for imagens
app.use(express.static('public'));

// Routes
const UserRoutes = require('./routes/UserRoutes');
const PropertiesRoutes = require('./routes/PropertiesRoutes');

app.use('/users', UserRoutes)
app.use('/properties', PropertiesRoutes)

const PORT = process.env.PORT;

app.listen(PORT);
