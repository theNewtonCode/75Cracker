const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

// Routes
const trackerRoutes = require('./routes/tracker');
app.use('/api/tracker', trackerRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
