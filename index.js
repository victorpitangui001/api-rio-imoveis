const express = require('express');
const cors = require('cors');
const port = 5000

const app = express();

// Config JSON response
app.use(express.json());

// Solve Cors
app.use(cors({credentials: true, origin:'http://localhost:3000'}));

// Public folder for imagens
app.use(express.static('public'));

// Routes
const UserRoutes = require('./routes/UserRoutes');
const PropertiesRoutes = require('./routes/PropertiesRoutes');

app.use('/users', UserRoutes)
app.use('/properties', PropertiesRoutes)


app.listen(port)
