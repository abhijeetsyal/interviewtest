const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const seatRoutes = require('./routes/seats');
const connectDB = require('./config/db');

const app = express();

connectDB()

app.use(bodyParser.json());

app.use('/seats', seatRoutes);
// Initialize seats if not already present

  
 


const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
